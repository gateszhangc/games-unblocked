import re
import requests
from urllib.parse import urljoin, urlparse
from collections import defaultdict
import time

# Base URL
base_url = "https://unblocked-games.s3.amazonaws.com/"

# Read the dublix.html file
with open('dublix.html', 'r', encoding='utf-8') as file:
    html_content = file.read()

# Extract all links from the HTML
link_pattern = r'href=["\']([^"\']+)["\']'
links = re.findall(link_pattern, html_content)

# Filter and normalize links
internal_links = set()
external_links = set()

for link in links:
    # Skip javascript, mailto, and other non-http links
    if link.startswith('javascript:') or link.startswith('mailto:') or link.startswith('#'):
        continue
    
    # Convert relative links to absolute
    if link.startswith('./') or link.startswith('/'):
        absolute_link = urljoin(base_url, link)
    else:
        absolute_link = link
    
    # Check if it's an internal link (same domain)
    parsed_base = urlparse(base_url)
    parsed_link = urlparse(absolute_link)
    
    if parsed_base.netloc == parsed_link.netloc:
        # Clean up the URL - remove fragments
        clean_link = parsed_link._replace(fragment="").geturl()
        internal_links.add(clean_link)
    else:
        external_links.add(absolute_link)

# Categorize internal links
page_types = defaultdict(list)
other_files = set()

for link in internal_links:
    parsed = urlparse(link)
    path = parsed.path
    
    # Categorize by file type or directory
    if path.endswith('.html'):
        if path.endswith('index.html'):
            if path == '/' or path.endswith('/index.html'):
                page_types['Home Pages'].append(link)
            else:
                page_types['Category Index Pages'].append(link)
        else:
            page_types['Game Pages'].append(link)
    elif path.endswith('.css'):
        other_files.add('CSS Files')
    elif path.endswith('.js'):
        other_files.add('JavaScript Files')
    elif path.endswith('.webp') or path.endswith('.jpg') or path.endswith('.png') or path.endswith('.ico') or path.endswith('.svg'):
        other_files.add('Image Files')
    elif path.endswith('.json'):
        other_files.add('JSON Files')
    else:
        page_types['Other Pages'].append(link)

# Create a markdown report
report = f"""# Website Page Count Analysis

## Summary
- Total Internal Links: {len(internal_links)}
- Total External Links: {len(external_links)}
- Total Unique Pages: {sum(len(pages) for pages in page_types.values())}

## Page Categories

### Home Pages ({len(page_types['Home Pages'])})
{chr(10).join(f"- {link}" for link in sorted(page_types['Home Pages']))}

### Game Pages ({len(page_types['Game Pages'])})
{chr(10).join(f"- {link}" for link in sorted(page_types['Game Pages']))}

### Category Index Pages ({len(page_types['Category Index Pages'])})
{chr(10).join(f"- {link}" for link in sorted(page_types['Category Index Pages']))}

### Other Pages ({len(page_types['Other Pages'])})
{chr(10).join(f"- {link}" for link in sorted(page_types['Other Pages']))}

## Other File Types
{chr(10).join(f"- {file_type}" for file_type in sorted(other_files))}

## External Links ({len(external_links)})
{chr(10).join(f"- {link}" for link in sorted(external_links)[:20])}
{'...' if len(external_links) > 20 else ''}

## Total Web Pages
The website contains approximately **{sum(len(pages) for pages in page_types.values())} web pages**.
"""

# Save the report to a markdown file
with open('website_page_count.md', 'w', encoding='utf-8') as file:
    file.write(report)

print("Analysis complete. Report saved to website_page_count.md")
print(f"Total web pages found: {sum(len(pages) for pages in page_types.values())}")