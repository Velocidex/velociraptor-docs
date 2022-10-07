import urllib.request
import os.path
import subprocess
import json
import sys

VERIFY_QUERY = '''
SELECT artifact_set(
    definition=read_file(filename=OSPath),
    prefix="Exchange.").name AS ImportedArtifact,
   FullPath
FROM glob(globs=FILES)
'''

# A dummy config file that allows us to run the query.
VELO_CONFIG = '''
Client:
  server_urls:
    - http://localhost/
  ca_certificate:
    XXX
  nonce: XX
Datastore:
  implementation: Test
'''
VELO_CONFIG_FILENAME = "/tmp/velo.config.yaml"
VELO_FILENAME = "/tmp/velociraptor"
VELO_URL = "https://github.com/Velocidex/velociraptor/releases/download/v0.6.4-2/velociraptor-v0.6.4-2-linux-amd64"
EXCHANGE_PATH = os.path.abspath("./content/exchange/artifacts/")
VELO_LOGFILE = "/tmp/velo.log"

# Verify artifact contains correct file extension
# Skip other specific file types
VALID_EXTENSIONS = (".yaml", ".gitignore", ".jpg", ".png")
for f in os.listdir(EXCHANGE_PATH):
    if '.' in f:
        if not f.endswith(VALID_EXTENSIONS):
            raise Exception("ERROR: File {0} does not contain a valid extension!".format(f))

with open(VELO_CONFIG_FILENAME, "w") as fd:
    fd.write(VELO_CONFIG)

# Download this binary to verify the exchange artifacts
try:
    os.stat(VELO_FILENAME)
except OSError:
    with open(VELO_FILENAME, "wb") as fd:
        print("Download velociraptor from %s" % VELO_URL)
        data = urllib.request.urlopen(VELO_URL).read()
        print("Done!")
        fd.write(data)

os.chmod(VELO_FILENAME, 0o755)

result = []
with subprocess.Popen([
        VELO_FILENAME,
        "--config", VELO_CONFIG_FILENAME,
        "--logfile", VELO_LOGFILE,
        "query",
        "--format", "jsonl",
        VERIFY_QUERY, "--env",
        "FILES=" + EXCHANGE_PATH + "/*.yaml"],
           stdout=subprocess.PIPE) as proc:
    for line in proc.stdout:
        result.append(json.loads(line))

failures = []
for item in result:
    if not item["ImportedArtifact"]:
        failures.append(item["FullPath"])
        print("Failed to load file %s" % item["FullPath"])

if failures:
    print("\n\n\nFailed to load artifacts: Full error log follows")
    print(open(VELO_LOGFILE, "r").read())
    sys.exit(-1)
