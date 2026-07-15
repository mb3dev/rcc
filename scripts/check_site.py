#!/usr/bin/env python3
"""Validate the static site before deployment.

Checks every HTML page for:
  - internal links and asset references that point at missing files
  - required elements (stylesheet, title, meta description)

Exits nonzero with a report if anything is broken, so a bad deploy
fails in CI instead of publishing a broken page.
"""
import re
import sys
from pathlib import Path
from urllib.parse import urlparse, unquote

ROOT = Path(__file__).resolve().parent.parent
SKIP_SCHEMES = ("http:", "https:", "mailto:", "tel:", "data:", "#")

errors = []
pages = sorted(p for p in ROOT.rglob("*.html")
               if ".git" not in p.parts and "_site" not in p.parts)

if not pages:
    errors.append("no HTML pages found")

for page in pages:
    rel = page.relative_to(ROOT)
    html = page.read_text(encoding="utf-8")

    # Redirect stubs (meta refresh) are exempt from the content checks.
    if 'http-equiv="refresh"' in html:
        continue

    if '<link rel="stylesheet"' not in html:
        errors.append(f"{rel}: missing stylesheet link")
    if "<title>" not in html:
        errors.append(f"{rel}: missing <title>")
    if 'name="description"' not in html:
        errors.append(f"{rel}: missing meta description")

    for url in re.findall(r'(?:href|src)="([^"]+)"', html):
        if url.startswith(SKIP_SCHEMES) or url == "":
            continue
        path = unquote(urlparse(url).path)
        if not path or path == "./":
            continue
        if path.startswith("/"):
            # Root-absolute paths break under a project-page base path.
            errors.append(f"{rel}: root-absolute URL '{url}' (use a relative path)")
            continue
        target = (page.parent / path).resolve()
        if path.endswith("/"):
            target = target / "index.html"
        if not target.exists():
            errors.append(f"{rel}: broken reference '{url}'")

for asset in ("styles.css", "site.js", "favicon-32.png", "apple-touch-icon.png",
              "assets/logo-full.png", "assets/logo-icon.png", "404.html", ".nojekyll"):
    if not (ROOT / asset).exists():
        errors.append(f"missing required file: {asset}")

if errors:
    print(f"FAILED: {len(errors)} problem(s)")
    for e in errors:
        print("  -", e)
    sys.exit(1)

print(f"OK: {len(pages)} pages checked, all internal links and assets resolve.")
