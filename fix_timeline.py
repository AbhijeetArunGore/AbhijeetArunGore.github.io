import re

with open('index_head.html', 'r', encoding='utf-8') as f:
    head_content = f.read()

# Extract experience section from HEAD
exp_pattern = r'(<!-- Experience Section -->\s*<section id=\"experience\" class=\"section\" data-aos=\"fade-up\">\s*<div class=\"container\">\s*<h2 class=\"section-title\">Professional Experience</h2>\s*<p.*?<div class=\"timeline\">)(.*?)(</div>\s*</div>\s*</section>)'
match = re.search(exp_pattern, head_content, flags=re.DOTALL)
if match:
    timeline_prefix = match.group(1)
    timeline_items_raw = match.group(2)
    timeline_suffix = match.group(3)
else:
    print('Failed to find experience section in HEAD')
    exit(1)

# Extract individual items
items = re.findall(r'(<!-- .*? -->\s*<div class=\"timeline-item\" data-aos=\"fade-left\">.*?</div>)(?=\s*<!-- |\Z)', timeline_items_raw, flags=re.DOTALL)

items_dict = {}
for item in items:
    if 'AWS Data Engineering' in item: items_dict['AWS Data Engineering'] = item
    elif 'AI Leela' in item: items_dict['AI Leela'] = item
    elif 'AWS Cloud GenAI' in item: items_dict['AWS Cloud GenAI'] = item
    elif 'Altair Data Science' in item: items_dict['Altair Data Science'] = item
    elif 'Zensar' in item: items_dict['Zensar'] = item
    elif 'Google AI/ML' in item: items_dict['Google AI/ML'] = item
    elif 'Deloitte Forage' in item: items_dict['Deloitte Forage'] = item
    elif 'Tata Forage' in item: items_dict['Tata Forage'] = item

# 1. Update Zensar date
if 'Zensar' in items_dict:
    items_dict['Zensar'] = items_dict['Zensar'].replace('<span class=\"duration\">Jan 2025 – Feb 2025</span>', '<span class=\"duration\">Mar 2026 – Apr 2026</span>')

# 2. Clean up AI Leela
if 'AI Leela' in items_dict:
    item = items_dict['AI Leela']
    item = re.sub(r'<span class=\"role\">.*?</span>', '<span class=\"role\">Python Development Intern <span class=\"experience-grade\" style=\"background:#eef2ff; color:#00468C;\">Industry Internship</span></span>', item)
    item = re.sub(r'<ul class=\"experience-list\">.*?</ul>', '<ul class=\"experience-list\">\n                        <li>Developed AI-driven application for medical report analysis and patient-friendly health insights using Python.</li>\n                        <li>Implemented core data extraction pipelines and historical trend tracking.</li>\n                        <li>Applied Python logic for automated interpretation of medical data and health recommendations.</li>\n                        <li>Practiced industry-standard software development workflows and data modeling best practices.</li>\n                    </ul>', item, flags=re.DOTALL)
    item = re.sub(r'<div class=\"project-tags\".*?</div>', '<div class=\"project-tags\" style=\"margin-top: 12px;\">\n                        <span class=\"tag\">Python</span><span class=\"tag\">AI Analysis</span><span class=\"tag\">Data Extraction</span>\n                    </div>', item, flags=re.DOTALL)
    items_dict['AI Leela'] = item

# 3. Clean up Zensar bullets
if 'Zensar' in items_dict:
    item = items_dict['Zensar']
    item = item.replace('<li>Java fundamentals and OOP (classes, objects, interfaces, abstraction).</li>', '')
    item = item.replace('<li>Advanced Python (OOP, classes, inheritance, encapsulation, polymorphism, exception handling) applied to industry case studies.</li>', '<li>Advanced Python (OOP, classes, inheritance, encapsulation, polymorphism, exception handling) applied to industry case studies.</li>')
    items_dict['Zensar'] = item

# Order items
order = [
    'AWS Data Engineering',
    'Zensar',
    'AI Leela',
    'Deloitte Forage',
    'AWS Cloud GenAI',
    'Altair Data Science',
    'Tata Forage',
    'Google AI/ML'
]

ordered_items_html = '\n\n                '.join(items_dict[k] for k in order if k in items_dict)

# Load current broken index.html and replace its timeline
with open('index.html', 'r', encoding='utf-8') as f:
    current_content = f.read()

# Find the broken timeline in current index.html
current_exp_pattern = r'(<!-- Experience Section -->\s*<section id=\"experience\" class=\"section\" data-aos=\"fade-up\">\s*<div class=\"container\">\s*<h2 class=\"section-title\">Professional Experience</h2>.*?<div class=\"timeline\">)(.*?)(</div>\s*</div>\s*</section>)'
match_curr = re.search(current_exp_pattern, current_content, flags=re.DOTALL)

if match_curr:
    # Inject the rebuilt timeline items
    new_content = current_content[:match_curr.start(2)] + '\n\n                ' + ordered_items_html + '\n\n            ' + current_content[match_curr.end(2):]
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print('Timeline fixed, sorted, and updated!')
else:
    print('Could not find timeline in current index.html')
