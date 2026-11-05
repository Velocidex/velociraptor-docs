"""Integration regressions for MacOS.UnifiedLogHunter, using synthetic execve output.

Run on macOS with VELOCIRAPTOR_BINARY pointing to a local Velociraptor binary.
No native log collection, server, external services, or Python packages are used.
"""

from collections import Counter
import hashlib
import json
import os
from pathlib import Path
import shutil
import re
import subprocess
import sys
import tempfile
import unittest


ARTIFACT_RELATIVE_PATH = "content/exchange/artifacts/MacOS.UnifiedLogHunter.yaml"
EVENT = {
    "timestamp": "2026-01-02 03:04:05.000000+0000",
    "machTimestamp": 101,
    "traceID": 102,
    "eventMessage": "Synthetic collection regression event",
    "eventType": "logEvent",
    "messageType": "Default",
    "category": "fixture",
    "subsystem": "org.example.collectiontest",
    "processID": 123,
    "processImagePath": "/synthetic/collector",
    "processImageUUID": "00000000-0000-0000-0000-000000000001",
    "senderImagePath": "/synthetic/sender",
    "senderImageUUID": "00000000-0000-0000-0000-000000000002",
    "senderProgramCounter": 103,
    "source": "synthetic",
    "formatString": "Synthetic collection regression event",
    "activityIdentifier": 104,
    "parentActivityIdentifier": 105,
    "threadID": 106,
    "backtrace": {"frames": []},
    "bootUUID": "00000000-0000-0000-0000-000000000003",
    "timezoneName": "UTC",
}

# Independently specified public results, including column order. The artifact
# plugin appends _Source with the artifact identity; this does not validate
# the underlying native source-field projection.
EXPECTED_EVENT = {
    "EventTime": "2026-01-02T03:04:05Z",
    "_TimeSinceBoot": 101,
    "_TraceID": 102,
    "EventMessage": "Synthetic collection regression event",
    "EventType": "logEvent",
    "MessageType": "Default",
    "Category": "fixture",
    "Subsystem": "org.example.collectiontest",
    "PID": 123,
    "ProcessImagePath": "/synthetic/collector",
    "ProcessImageUUID": "00000000-0000-0000-0000-000000000001",
    "SenderImagePath": "/synthetic/sender",
    "SenderImageUUID": "00000000-0000-0000-0000-000000000002",
    "SenderProgramCounter": 103,
    "_FormatString": "Synthetic collection regression event",
    "ActivityID": 104,
    "ParentActivityID": 105,
    "_ThreadID": 106,
    "_Backtrace": {"frames": []},
    "_BootUUID": "00000000-0000-0000-0000-000000000003",
    "_TimezoneName": "UTC",
    "_Source": "MacOS.UnifiedLogHunter",
}

# PATH is private to the Velociraptor subprocess. This fixture exercises the real
# execve plugin, including separate stderr chunks and the final exit status.
# It never reads the host's Unified Log store.
LOG_FIXTURE = '''#!/usr/bin/env python3
import json
import os
from pathlib import Path
import signal
import sys

args = sys.argv[1:]
expected = {"--start": "2026-01-02 03:04:00+0000",
            "--end": "2026-01-02 03:05:00+0000", "--style": "json"}
if not args or args[0] != "show" or any(args[args.index(k) + 1] != v for k, v in expected.items()):
    raise RuntimeError("Unexpected fixture arguments: " + repr(args))
predicate = args[args.index("--predicate") + 1]
receipt = Path(os.environ["ULH_TEST_INVOCATIONS"]) / (str(os.getpid()) + ".json")
receipt.write_text(json.dumps({"predicate": predicate, "completed": False, "argv": args}))
event = Path(__file__).with_name("event.json").read_text()
cases = {
    "fixture:success": (event, "", 0),
    "fixture:empty": ("[]", "", 0),
    "fixture:empty-stdout": ("", "", 0),
    "fixture:failure": ("", "log: Bad predicate: fixture:failure\\n", 64),
    "fixture:failure-no-stderr": ("", "", 64),
    "fixture:warning": (event, "synthetic warning: 100% complete\\n", 0),
    "fixture:warning-empty": ("[]", "synthetic warning with no events\\n", 0),
    "fixture:partial": (event, "synthetic failure after output\\n", 65),
    "fixture:chunked-warning": ("[]", "x" * 256 + "TAIL", 0),
    "fixture:failure-b": ("", "log: Bad predicate: fixture:failure-b\\n", 64),
    "fixture:large": (json.dumps(json.loads(event) * 40), "", 0),
    "fixture:large%v": (json.dumps(json.loads(event) * 40), "", 0),
    "fixture:exact": (event, "", 0),
    "fixture:exact-newline": (event + "\\n", "", 0),
    "fixture:empty-newline": ("[]\\n", "", 0),
    "fixture:whitespace": ("  \\n", "", 0),
    "fixture:format-verbs": ("[]", "%s %d %v %!x %n\\n", 0),
    "messageType == error": (event, "note: benign warning text\\n", 0),
    "fixture:error-text-warning": (event, "Error: synthetic warning text\\n", 0),
}
if predicate == "fixture:sigkill":
    sys.stdout.write(event)
    sys.stdout.flush()
    os.kill(os.getpid(), signal.SIGKILL)
stdout, stderr, status = cases[predicate]
sys.stdout.write(stdout)
sys.stderr.write(stderr)
sys.stdout.flush()
sys.stderr.flush()
receipt.write_text(json.dumps({"predicate": predicate, "completed": True, "argv": args}))
sys.exit(status)
'''


class UnifiedLogHunterTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        # The direct Artifact plugin disables preconditions by default. This
        # restriction reflects validation of this harness, not VQL necessity.
        # Fail explicitly rather than returning a misleading all-skipped OK.
        if sys.platform != "darwin":
            raise RuntimeError("This harness has only been validated on macOS; no tests ran")
        binary = os.environ.get("VELOCIRAPTOR_BINARY")
        if not binary or not Path(binary).is_file():
            raise RuntimeError("Set VELOCIRAPTOR_BINARY to a local Velociraptor binary")
        cls.binary = str(Path(binary).resolve())
        default_artifact = Path(__file__).resolve().parents[2] / ARTIFACT_RELATIVE_PATH
        cls.artifact = Path(os.environ.get("UNIFIED_LOG_HUNTER_ARTIFACT", default_artifact))
        if not cls.artifact.is_file():
            raise RuntimeError(f"Artifact does not exist: {cls.artifact}")
        cls.input_hashes = {
            "artifact_sha256": hashlib.sha256(cls.artifact.read_bytes()).hexdigest(),
            "test_runner_sha256": hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),
            "binary_sha256": hashlib.sha256(Path(cls.binary).read_bytes()).hexdigest(),
        }
        evidence = os.environ.get("UNIFIED_LOG_HUNTER_EVIDENCE_DIR")
        cls.evidence = Path(evidence).resolve() if evidence else None
        if cls.evidence:
            cls.evidence.mkdir(parents=True, exist_ok=False)

    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(prefix="unified-log-hunter-test-")
        self.addCleanup(self.temp.cleanup)
        self.directory = Path(self.temp.name)
        self.definitions = self.directory / "definitions"
        self.definitions.mkdir()
        shutil.copyfile(self.artifact, self.definitions / self.artifact.name)
        self.fixture_bin = self.directory / "bin"
        self.fixture_bin.mkdir()
        (self.fixture_bin / "log").write_text(LOG_FIXTURE)
        (self.fixture_bin / "log").chmod(0o700)
        (self.fixture_bin / "python3").symlink_to(Path(sys.executable).resolve())
        (self.fixture_bin / "event.json").write_text(json.dumps([EVENT]))
        self.run_count = 0

    def collect(self, predicate="", filters=(), filter_regex="", length=10000000,
                expect_failure=False, missing_log=False, unexecutable_log=False):
        self.run_count += 1
        filter_rows = ",".join(
            f"dict(QueryName={json.dumps(name)},Q={json.dumps(query)})"
            for name, query in filters
        )
        query = (
            "SELECT * FROM Artifact.MacOS.UnifiedLogHunter("
            'StartDate="2026-01-02T03:04:00Z",EndDate="2026-01-02T03:05:00Z",'
            f"Predicate={json.dumps(predicate)},Length={length},"
            f"FilterRegex={json.dumps(filter_regex)},Filters=[{filter_rows}])"
        )
        command = [
            self.binary, "-v", "--nobanner", "--nocolor",
            "--definitions", str(self.definitions), "query", "--timeout=20",
            "--format=jsonl", query,
        ]
        # Excluding VELOCIRAPTOR_* configuration variables prevents accidental
        # connections to an existing server or use of a developer's config.
        environment = {
            "PATH": str(self.fixture_bin),
            "LANG": "C", "LC_ALL": "C", "TMPDIR": str(self.directory),
        }
        invocations = self.directory / f"invocations-{self.run_count}"
        invocations.mkdir()
        environment["ULH_TEST_INVOCATIONS"] = str(invocations)
        if missing_log:
            (self.fixture_bin / "log").unlink()
        if unexecutable_log:
            (self.fixture_bin / "log").chmod(0o600)
        result = subprocess.run(
            command, env=environment, cwd=self.directory, capture_output=True,
            text=True, timeout=30, check=False,
        )
        self.last_result = result
        calls = [json.loads(p.read_text()) for p in invocations.glob("*.json")]
        expected_calls = ([predicate] if predicate else []) + [
            query for name, query in filters if filter_regex and re.search(filter_regex, name)
        ]
        if missing_log or unexecutable_log:
            expected_calls = []
        if self.evidence:
            record = {
                "test": self.id(), "query": query, "command": command,
                "artifact": str(self.artifact.resolve()),
                "returncode": result.returncode,
                "stdout": result.stdout, "stderr": result.stderr,
                "fixture": "synthetic log executable; real execve and VQL",
                "input_hashes": self.input_hashes,
                "fixture_sha256": hashlib.sha256(LOG_FIXTURE.encode()).hexdigest(),
                "event_sha256": hashlib.sha256((self.fixture_bin / "event.json").read_bytes()).hexdigest(),
                "invocations": calls, "expected_invocations": expected_calls,
            }
            with (self.evidence / f"{self._testMethodName}-{self.run_count}.json").open("x") as stream:
                json.dump(record, stream, indent=2)
                stream.write("\n")
        self.assertEqual(Counter(x["predicate"] for x in calls), Counter(expected_calls), result.stderr)
        for call in calls:
            self.assertEqual(call["completed"], call["predicate"] != "fixture:sigkill", call)
        self.assertEqual(result.returncode, 1 if expect_failure else 0, result.stderr)
        rows = [json.loads(line) for line in result.stdout.splitlines() if line.strip()]
        diagnostics = [
            line for line in result.stderr.splitlines()
            if line.startswith("[") and "MacOS.UnifiedLogHunter:" in line
        ]
        return rows, diagnostics

    def assert_error(self, diagnostics, code, predicate):
        pattern = re.compile(r"^\[ERROR\] .*log show failed with status %s for predicate \[%s\]\s*$"
                             % (re.escape(str(code)), re.escape(predicate)))
        matching = [
            line for line in diagnostics if pattern.match(line)
        ]
        self.assertEqual(len(matching), 1, diagnostics)

    def assert_quiet(self):
        self.assertFalse(re.search(r"^\[(?:WARN(?:ING)?|ERROR)\]", self.last_result.stderr, re.M),
                         self.last_result.stderr)

    def assert_buffer_error(self, diagnostics, predicate, unique=True):
        expected = f"stdout exceeded its buffer for predicate [{predicate}]; returned events may be incomplete. Increase Length and rerun."
        pattern = re.compile(r"^\[ERROR\] .*" + re.escape(expected) + r"\s*$")
        matches = [line for line in diagnostics if pattern.match(line)]
        if unique:
            self.assertEqual(len(matches), 1, diagnostics)
        else:
            self.assertGreaterEqual(len(matches), 1, diagnostics)
        return matches

    def test_success_preserves_event_columns(self):
        rows, diagnostics = self.collect("fixture:success")
        self.assertEqual(rows, [EXPECTED_EVENT])
        self.assertEqual(list(rows[0]), list(EXPECTED_EVENT))
        self.assertEqual(diagnostics, [])
        self.assert_quiet()

    def test_valid_empty_result_is_quiet(self):
        rows, diagnostics = self.collect("fixture:empty")
        self.assertEqual(rows, [])
        self.assertEqual(diagnostics, [])
        self.assert_quiet()

    def test_empty_stdout_is_not_parsed_as_an_event(self):
        rows, diagnostics = self.collect("fixture:empty-stdout")
        self.assertEqual(rows, [])
        self.assertEqual(diagnostics, [])
        self.assert_quiet()

    def test_failure_logs_status_and_stderr(self):
        rows, diagnostics = self.collect("fixture:failure", expect_failure=True)
        self.assertEqual(rows, [])
        self.assert_error(diagnostics, 64, "fixture:failure")
        self.assertTrue(any("log: Bad predicate: fixture:failure" in x for x in diagnostics))

    def test_failure_without_stderr_still_logs_status(self):
        rows, diagnostics = self.collect("fixture:failure-no-stderr", expect_failure=True)
        self.assertEqual(rows, [])
        self.assert_error(diagnostics, 64, "fixture:failure-no-stderr")

    def test_command_launch_failure_is_visible(self):
        rows, diagnostics = self.collect(
            "fixture:success", expect_failure=True, missing_log=True,
        )
        self.assertEqual(rows, [])
        self.assert_error(diagnostics, 1, "fixture:success")
        self.assertTrue(any("executable file not found" in x for x in diagnostics))

    def test_warning_preserves_valid_events(self):
        rows, diagnostics = self.collect("fixture:warning")
        self.assertEqual(rows, [EXPECTED_EVENT])
        self.assertEqual(len(diagnostics), 1, diagnostics)
        self.assertIn("100% complete", diagnostics[0])
        self.assertRegex(diagnostics[0], r"(?:\[WARN(?:ING)?\]|WARN:)")
        self.assertNotIn("log show failed", diagnostics[0])

    def test_warning_with_empty_result_is_visible(self):
        rows, diagnostics = self.collect("fixture:warning-empty")
        self.assertEqual(rows, [])
        self.assertEqual(len(diagnostics), 1, diagnostics)
        self.assertIn("synthetic warning with no events", diagnostics[0])
        self.assertRegex(diagnostics[0], r"(?:\[WARN(?:ING)?\]|WARN:)")

    def test_partial_output_keeps_evidence_and_logs_failure(self):
        rows, diagnostics = self.collect("fixture:partial", expect_failure=True)
        self.assertEqual(rows, [EXPECTED_EVENT])
        self.assert_error(diagnostics, 65, "fixture:partial")

    def test_chunked_stderr_is_not_suppressed(self):
        rows, diagnostics = self.collect("fixture:chunked-warning", length=64)
        self.assertEqual(rows, [])
        warning_lines = [x for x in diagnostics if "log show stderr" in x]
        self.assertEqual(len(warning_lines), 5, diagnostics)
        self.assertEqual(sum(x.count("x" * 64) for x in warning_lines), 4)
        self.assertTrue(any("TAIL" in x for x in warning_lines))

    def test_failure_does_not_hide_successful_filter(self):
        rows, diagnostics = self.collect(
            filters=(("failure", "fixture:failure"), ("success", "fixture:success")),
            filter_regex=".", expect_failure=True,
        )
        self.assertEqual(rows, [EXPECTED_EVENT])
        self.assert_error(diagnostics, 64, "fixture:failure")
        self.assertFalse(any("for predicate [fixture:success]" in x for x in diagnostics))

    def test_repeated_failures_are_not_deduplicated(self):
        rows, diagnostics = self.collect(
            filters=(("first", "fixture:failure"), ("second", "fixture:failure")),
            filter_regex=".", expect_failure=True,
        )
        self.assertEqual(rows, [])
        failures = [x for x in diagnostics if "log show failed with status 64" in x]
        self.assertEqual(len(failures), 2, diagnostics)

    def test_custom_predicate_and_selected_filter_both_run(self):
        rows, diagnostics = self.collect(
            "fixture:success", filters=(("selected", "fixture:failure-no-stderr"),
                                        ("ignored", "fixture:partial")),
            filter_regex="^selected$", expect_failure=True,
        )
        self.assertEqual(rows, [EXPECTED_EVENT])
        self.assert_error(diagnostics, 64, "fixture:failure-no-stderr")
        self.assertFalse(any("fixture:partial" in x for x in diagnostics))

    def test_nonexecutable_fixture_cannot_fall_back_to_host_log(self):
        rows, diagnostics = self.collect("fixture:success", unexecutable_log=True, expect_failure=True)
        self.assertEqual(rows, [])
        self.assert_error(diagnostics, 1, "fixture:success")

    def test_predicate_ending_in_error_does_not_manufacture_error_colon(self):
        rows, diagnostics = self.collect("messageType == error")
        self.assertEqual(rows, [EXPECTED_EVENT])
        self.assertEqual(len(diagnostics), 1, diagnostics)
        self.assertRegex(diagnostics[0], r"^\[WARN(?:ING)?\]")
        self.assertIn("predicate [messageType == error]: note: benign warning text", diagnostics[0])
        # The v0.77.3 server error regex includes case-insensitive 'Error:'.
        # This checks the artificial match, not all possible warning contents.
        self.assertNotRegex(diagnostics[0], r"(?i)error:")

    def test_error_colon_in_stderr_remains_warning_in_cli(self):
        rows, diagnostics = self.collect("fixture:error-text-warning")
        self.assertEqual(rows, [EXPECTED_EVENT])
        self.assertEqual(len(diagnostics), 1, diagnostics)
        self.assertRegex(diagnostics[0], r"^\[WARN(?:ING)?\]")
        self.assertIn("Error: synthetic warning text", diagnostics[0])
        # Server flows may promote this message to ERROR; this test is CLI-only.

    def test_stderr_format_verbs_are_literal(self):
        rows, diagnostics = self.collect("fixture:format-verbs")
        self.assertEqual(rows, [])
        self.assertEqual(len(diagnostics), 1, diagnostics)
        self.assertIn("%s %d %v %!x %n", diagnostics[0])

    def test_signal_failure_keeps_valid_output(self):
        rows, diagnostics = self.collect("fixture:sigkill", expect_failure=True)
        self.assertEqual(rows, [EXPECTED_EVENT])
        self.assert_error(diagnostics, -1, "fixture:sigkill")

    def test_distinct_failures_are_attributed_exactly(self):
        rows, diagnostics = self.collect(
            filters=(("first", "fixture:failure"), ("second", "fixture:failure-b")),
            filter_regex=".", expect_failure=True)
        self.assertEqual(rows, [])
        self.assert_error(diagnostics, 64, "fixture:failure")
        self.assert_error(diagnostics, 64, "fixture:failure-b")

    def test_large_output_reports_possible_incompleteness(self):
        rows, diagnostics = self.collect("fixture:large", length=1024, expect_failure=True)
        self.assertEqual(rows, [])
        self.assert_buffer_error(diagnostics, "fixture:large")
        self.assertEqual(len(diagnostics), 1, diagnostics)

    def test_large_output_diagnostics_keep_distinct_predicates_and_literal_percent(self):
        rows, diagnostics = self.collect(
            filters=(("first", "fixture:large"), ("second", "fixture:large%v")),
            filter_regex=".", length=1024, expect_failure=True)
        self.assertEqual(rows, [])
        # Core log-cache initialization/deduplication is not atomic across
        # concurrent filters. Require both exact messages, allow duplicates,
        # and reject unrelated diagnostics; do not assume exactly-once logs.
        expected = self.assert_buffer_error(diagnostics, "fixture:large", unique=False)
        expected += self.assert_buffer_error(diagnostics, "fixture:large%v", unique=False)
        self.assertCountEqual(diagnostics, expected)

    def test_complete_json_exactly_at_length_is_quiet(self):
        length = len((self.fixture_bin / "event.json").read_bytes())
        rows, diagnostics = self.collect("fixture:exact", length=length)
        self.assertEqual(rows, [EXPECTED_EVENT])
        self.assertEqual(diagnostics, [])
        self.assert_quiet()

    def test_complete_json_then_newline_retains_event_and_reports_chunking(self):
        length = len((self.fixture_bin / "event.json").read_bytes())
        rows, diagnostics = self.collect("fixture:exact-newline", length=length, expect_failure=True)
        self.assertEqual(rows, [EXPECTED_EVENT])
        self.assert_buffer_error(diagnostics, "fixture:exact-newline")
        self.assertEqual(len(diagnostics), 1, diagnostics)
        self.assertNotIn("cannot be parsed", diagnostics[0])

    def test_empty_array_with_newline_is_quiet(self):
        rows, diagnostics = self.collect("fixture:empty-newline")
        self.assertEqual(rows, [])
        self.assertEqual(diagnostics, [])
        self.assert_quiet()

    def test_whitespace_only_stdout_is_quiet(self):
        rows, diagnostics = self.collect("fixture:whitespace")
        self.assertEqual(rows, [])
        self.assertEqual(diagnostics, [])
        self.assert_quiet()


if __name__ == "__main__":
    unittest.main(verbosity=2)
