import urllib.request
import json
import sys

def test_live():
    url = "https://che-resource-hub-2.onrender.com/api/courses/ChE-401/files/3/summarize"
    print(f"Requesting live summarization: {url}")
    req = urllib.request.Request(url, method="POST")
    try:
        with urllib.request.urlopen(req) as resp:
            print(f"Status: {resp.status}")
            print(f"Headers: {dict(resp.headers)}")
            contentType = resp.headers.get("Content-Type", "")
            
            if "application/json" in contentType:
                content = resp.read().decode('utf-8')
                print("Response is JSON:")
                print(content[:500])
            else:
                print("Response is Event Stream:")
                # Read line by line
                for line in resp:
                    decoded = line.decode('utf-8').strip()
                    if decoded:
                        print(decoded)
    except Exception as e:
        print(f"Error: {e}")
        if hasattr(e, 'read'):
            print(e.read().decode('utf-8'))

if __name__ == '__main__':
    test_live()
