import urllib.request
import json
import sys

def test_endpoint(url, expected_status=200, is_json=True):
    print(f"Testing {url} ... ", end="")
    try:
        req = urllib.request.Request(url)
        with urllib.request.urlopen(req) as response:
            status = response.status
            if status != expected_status:
                print(f"FAILED (Got status {status}, expected {expected_status})")
                return False
            
            body = response.read()
            if is_json:
                data = json.loads(body.decode('utf-8'))
                print(f"SUCCESS (JSON parsed, length {len(data)})")
                return data
            else:
                content = body.decode('utf-8')
                print(f"SUCCESS (HTML/Text parsed, length {len(content)})")
                return content
    except Exception as e:
        print(f"FAILED with error: {str(e)}")
        return False

def run_tests():
    base_url = "http://127.0.0.1:8000"
    success = True
    
    # Test Root HTML SPA index
    print("\n--- Testing Static Hosting ---")
    html = test_endpoint(f"{base_url}/", is_json=False)
    if not html or "<html" not in html.lower():
        print("Root HTML validation failed!")
        success = False
        
    # Test Courses API
    print("\n--- Testing Courses API ---")
    courses = test_endpoint(f"{base_url}/api/courses")
    if not courses or len(courses) == 0:
        print("Courses API validation failed!")
        success = False
    else:
        # Check specific course keys
        course_ids = [c["id"] for c in courses]
        print(f"Cataloged course IDs: {course_ids}")
        for cid in ["ChE-401", "ChE-305", "309", "Matlab", "HYSYS"]:
            if cid not in course_ids:
                print(f"Error: Course {cid} missing from scan!")
                success = False

    # Test Notes API
    print("\n--- Testing Notes API ---")
    notes = test_endpoint(f"{base_url}/api/courses/ChE-401/notes")
    if not notes or "notes" not in notes:
        print("Notes API validation failed!")
        success = False

    # Test Logs API
    print("\n--- Testing Logs API ---")
    logs = test_endpoint(f"{base_url}/api/courses/ChE-401/logs")
    if not logs or len(logs) == 0:
        print("Logs API validation failed!")
        success = False

    # Test Links API
    print("\n--- Testing Links API ---")
    links = test_endpoint(f"{base_url}/api/courses/ChE-401/links")
    if not links or len(links) == 0:
        print("Links API validation failed!")
        success = False

    if success:
        print("\n=== ALL BACKEND & STATIC VERIFICATIONS PASSED SUCCESSFULLY! ===")
        sys.exit(0)
    else:
        print("\n=== VERIFICATION ENCOUNTERED ERRORS ===")
        sys.exit(1)

if __name__ == "__main__":
    run_tests()
