import re
import sys
import os

html_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "frontend", "index.html")

if not os.path.exists(html_path):
    print(f"Error: index.html not found at {html_path}")
    sys.exit(1)

with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

# Check for script tags loaded from jsdelivr/unpkg/cdnjs that are not pinned
# We look for src="https://cdn.jsdelivr.net/... without a version number (like @version)
# Specifically checking jsdelivr and unpkg as they support @version pinning.
unpinned = []

# Pattern matching jsdelivr/unpkg links
script_srcs = re.findall(r'src="(https://cdn\.jsdelivr\.net/npm/[^"]+)"', html)
script_srcs += re.findall(r'src="(https://unpkg\.com/[^"]+)"', html)

for src in script_srcs:
    # If the URL contains @latest or does not contain @ followed by a version number
    # (excluding standard paths that don't need versions, but libraries should be versioned)
    if "@latest" in src or "@" not in src:
        unpinned.append(src)

if unpinned:
    print("=== LINT FAILED: Unpinned CDN dependencies found! ===")
    for link in unpinned:
        print(f"  - {link}")
    print("\nPlease pin these to specific version numbers (e.g. library@1.2.3) to prevent upstream breakages.")
    sys.exit(1)

print("=== LINT SUCCESS: All script CDNs are properly version-pinned! ===")
sys.exit(0)
