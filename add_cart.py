import os
import glob

html_files = glob.glob('*.html')

search_str = """                <!-- Action Buttons & Theme -->
                <div class="d-flex align-items-center gap-3">
                    <button class="btn btn-link text-body p-0" id="themeToggle" aria-label="Toggle Theme">
                        <i class="bi bi-moon fs-5" id="themeIcon"></i>
                    </button>"""

replace_str = """                <!-- Action Buttons & Theme -->
                <div class="d-flex align-items-center gap-3">
                    <button class="btn btn-link text-body p-0" id="themeToggle" aria-label="Toggle Theme">
                        <i class="bi bi-moon fs-5" id="themeIcon"></i>
                    </button>
                    <a href="shop.html" class="btn btn-link text-body p-0 position-relative ms-2 me-2" aria-label="Cart" id="globalCartIcon">
                        <i class="bi bi-cart3 fs-5"></i>
                        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style="font-size: 0.6rem;" id="cartCount">
                            0
                        </span>
                    </a>"""

for file in html_files:
    if file == 'dashboard.html':
        continue # dashboard has a different nav
        
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content.replace(search_str, replace_str)
    
    if new_content != content:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {file}")
    else:
        print(f"No match found in {file}")
