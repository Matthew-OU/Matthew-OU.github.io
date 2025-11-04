document.addEventListener('DOMContentLoaded', function () {

    // ========================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start' // Ensures consistent scroll-to-top behavior
                });
            }
        });
    });

    // ========================================
    // ACTIVE NAV LINK HIGHLIGHTING ON SCROLL
    // ========================================
    const navLinks = document.querySelectorAll('.navbar a');
    const sections = document.querySelectorAll('section');

    function updateActiveLink() {
        let currentSection = '';

        // Account for navbar height (180px) + small buffer
        const scrollPos = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            // Check if current scroll position is within this section
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        // Update active class only if section changed
        if (currentSection) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        }
    }

    // Throttle scroll events for better performance
    let ticking = false;
    window.addEventListener('scroll', function () {
        if (!ticking) {
            window.requestAnimationFrame(function () {
                updateActiveLink();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Set initial active state on page load
    updateActiveLink();
});