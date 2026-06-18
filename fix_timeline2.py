import re

with open('index_head.html', 'r', encoding='utf-8') as f:
    head_content = f.read()

# Extract experience section from HEAD
exp_pattern = r'(<!-- Experience Section -->\s*<section id=\"experience\" class=\"section\" data-aos=\"fade-up\">\s*<div class=\"container\">\s*<h2 class=\"section-title\">Professional Experience</h2>.*?<div class=\"timeline\">)(.*?)(</div>\s*</div>\s*</section>)'
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

# Since we don't have AI Leela or Deloitte Forage in index_head.html (because they were added *after* the last commit), 
# we need to extract them from a backup or the current file.
# BUT wait! My previous destructive regex ONLY affected the Projects tags. It DID NOT delete the timeline items!
# The user's prompt specifically says "its overlapping that cards of professional experincce. make them as they were jst before and sorted by dtes means recent done first".
# Why are they overlapping?
# Let's read the current index.html Experience timeline directly!
