"""Exchange metadata regression tests with synthetic GitHub responses."""

import io
import json
import unittest
from unittest.mock import patch

import exchange_index


class ExchangeMetadataTest(unittest.TestCase):
    def setUp(self):
        previous_data = patch.object(exchange_index, "previous_data", [])
        previous_data.start()
        self.addCleanup(previous_data.stop)
        self.record = {
            "title": "Server.Enrichment.Synthetic",
            "description": "Updated description",
            "tags": ["synthetic"],
        }
        self.path = "content/exchange/artifacts/Server.Enrichment.Synthetic.yaml"

    @patch("subprocess.check_output", return_value="2026-10-03T08:22:32+02:00\n")
    @patch.object(exchange_index.urllib.request, "urlopen")
    def test_unmerged_artifact_uses_its_local_creation_commit_date(self, urlopen, git):
        urlopen.return_value = io.BytesIO(b"[]")

        result = exchange_index.getAuthor(self.record, self.path)

        self.assertEqual(result["date"], "2026-10-03")
        self.assertEqual(result["author"], "")
        git.assert_called_once()

    @patch("subprocess.check_output")
    @patch.object(exchange_index.urllib.request, "urlopen")
    def test_cached_author_and_date_remain_unchanged(self, urlopen, git):
        cached = {
            "title": self.record["title"],
            "author": "existing-contributor",
            "date": "2020-05-06",
            "description": "Old description",
            "tags": ["old"],
        }
        exchange_index.previous_data = [cached]

        result = exchange_index.getAuthor(self.record, self.path)

        self.assertEqual(result["author"], "existing-contributor")
        self.assertEqual(result["date"], "2020-05-06")
        self.assertEqual(result["description"], self.record["description"])
        self.assertEqual(result["tags"], self.record["tags"])
        urlopen.assert_not_called()
        git.assert_not_called()

    @patch("subprocess.check_output")
    @patch.object(exchange_index.urllib.request, "urlopen")
    def test_upstream_creation_commit_remains_authoritative(self, urlopen, git):
        commits = [{
            "author": {
                "login": "upstream-contributor",
                "html_url": "https://github.com/upstream-contributor",
                "avatar_url": "https://example.invalid/avatar.png",
            },
            "commit": {"author": {"date": "2021-06-07T08:09:10Z"}},
        }]
        urlopen.return_value = io.BytesIO(json.dumps(commits).encode())

        result = exchange_index.getAuthor(self.record, self.path)

        self.assertEqual(result["author"], "upstream-contributor")
        self.assertEqual(result["date"], "2021-06-07")
        git.assert_not_called()


if __name__ == "__main__":
    unittest.main()
