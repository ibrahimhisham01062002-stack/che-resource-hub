import urllib.request
import urllib.error
import socket

urls = [
    "https://api-inference.huggingface.co/v1/chat/completions",
    "https://router.huggingface.co/v1/chat/completions"
]

for url in urls:
    print(f"Testing URL: {url}")
    try:
        req = urllib.request.Request(url, method="HEAD")
        with urllib.request.urlopen(req, timeout=5) as response:
            print(f"SUCCESS: Status {response.status}")
    except urllib.error.URLError as e:
        print(f"URL Error: {e}")
        if isinstance(e.reason, socket.gaierror):
            print(f"DNS Resolution failed: {e.reason}")
    except Exception as e:
        print(f"General Error: {e}")
    print("-" * 40)
