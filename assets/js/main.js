document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Functionality
    const themeToggleBtn = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    const themeIcon = document.getElementById('themeIcon');

    // Check for saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-bs-theme', savedTheme);
        updateThemeIcon(savedTheme);
    } else {
        // Default to light
        htmlElement.setAttribute('data-bs-theme', 'light');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-bs-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';

            htmlElement.setAttribute('data-bs-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        if (!themeIcon) return;
        if (theme === 'dark') {
            themeIcon.classList.remove('bi-moon');
            themeIcon.classList.add('bi-sun');
        } else {
            themeIcon.classList.remove('bi-sun');
            themeIcon.classList.add('bi-moon');
        }
    }

    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.style.display = 'flex';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    // Global Cart State
    const cartCountElement = document.getElementById('cartCount');
    let currentCartCount = parseInt(localStorage.getItem('ss_cart_count') || '0');

    if (cartCountElement) {
        cartCountElement.textContent = currentCartCount;
        // Hide badge if 0
        cartCountElement.style.display = currentCartCount > 0 ? 'inline-block' : 'none';
    }

    // Add to Cart Logic (Specifically for Shop buttons)
    const addToCartBtns = document.querySelectorAll('.card-body .btn-outline-custom');
    if (addToCartBtns.length > 0) {
        addToCartBtns.forEach(btn => {
            btn.addEventListener('click', function (e) {
                if (this.textContent.includes('Add to Cart')) {
                    e.preventDefault();

                    // Increment count
                    currentCartCount++;
                    localStorage.setItem('ss_cart_count', currentCartCount);
                    if (cartCountElement) {
                        cartCountElement.textContent = currentCartCount;
                        cartCountElement.style.display = 'inline-block';

                        // Small animation on badge
                        cartCountElement.classList.add('animate__animated', 'animate__rubberBand');
                        setTimeout(() => cartCountElement.classList.remove('animate__animated', 'animate__rubberBand'), 1000);
                    }

                    // Visual feedback on button
                    const originalText = this.innerHTML;
                    this.innerHTML = '<i class="bi bi-check2"></i> Added';
                    this.classList.remove('btn-outline-custom');
                    this.classList.add('btn-primary-custom');

                    setTimeout(() => {
                        this.innerHTML = originalText;
                        this.classList.add('btn-outline-custom');
                        this.classList.remove('btn-primary-custom');
                    }, 2000);
                }
            });
        });
    }

    // Global Newsletter Form Intercept
    const newsletterForms = document.querySelectorAll('.footer form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const input = this.querySelector('input[type="email"]');
            if (input && input.value) {
                const btn = this.querySelector('button');
                const originalContent = btn.innerHTML;
                btn.innerHTML = '<i class="bi bi-check2"></i>';
                btn.classList.add('bg-success', 'border-success');
                input.value = '';
                input.placeholder = 'Subscribed successfully!';

                setTimeout(() => {
                    btn.innerHTML = originalContent;
                    btn.classList.remove('bg-success', 'border-success');
                    input.placeholder = 'Email address';
                }, 3000);
            }
        });
    });

    // Contact Form Intercept
    const contactForm = document.querySelector('form[action="#"]');
    if (contactForm && window.location.pathname.includes('contact.html')) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const btn = this.querySelector('button[type="submit"]');

            // Show loading state
            const originalContent = btn.innerHTML;
            btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Sending...';
            btn.disabled = true;

            setTimeout(() => {
                // Success state
                btn.innerHTML = '<i class="bi bi-check-circle me-1"></i> Message Sent!';
                btn.classList.replace('btn-primary-custom', 'btn-success');
                this.reset();

                setTimeout(() => {
                    btn.innerHTML = originalContent;
                    btn.classList.replace('btn-success', 'btn-primary-custom');
                    btn.disabled = false;
                }, 4000);
            }, 1500);
        });
    }
});
