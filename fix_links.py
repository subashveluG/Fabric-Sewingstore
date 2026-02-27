import os
import glob

html_files = glob.glob('*.html')

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace home1.html and home2.html with index.html
    new_content = content.replace('href="home1.html"', 'href="index.html"')
    new_content = new_content.replace('href="home2.html"', 'href="index.html"')
    
    if new_content != content:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {file}")
