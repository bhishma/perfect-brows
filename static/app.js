
        document.addEventListener('DOMContentLoaded', function () {
            const slides = document.querySelectorAll('.carousel-slide');
            const prevBtn = document.getElementById('carousel-prev');
            const nextBtn = document.getElementById('carousel-next');
            const indicators = document.querySelectorAll('.carousel-indicator');
            let current = 0;
            let interval = null;

            function showSlide(idx) {
                slides.forEach((slide, i) => {
                    slide.classList.toggle('active', i === idx);
                    slide.style.display = i === idx ? 'block' : 'none';
                });
                indicators.forEach((ind, i) => {
                    ind.classList.toggle('active', i === idx);
                });
                current = idx;
            }

            function nextSlide() {
                showSlide((current + 1) % slides.length);
            }

            function prevSlide() {
                showSlide((current - 1 + slides.length) % slides.length);
            }

            // Set up indicators click
            indicators.forEach((ind, i) => {
                ind.addEventListener('click', () => {
                    showSlide(i);
                    resetInterval();
                });
            });

            // Set up prev/next buttons
            if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetInterval(); });
            if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetInterval(); });

            // Auto slide
            function startInterval() {
                interval = setInterval(nextSlide, 5000);
            }
            function resetInterval() {
                clearInterval(interval);
                startInterval();
            }

            // Initialize
            slides.forEach((slide, i) => {
                slide.style.display = i === 0 ? 'block' : 'none';
            });
            showSlide(0);
            startInterval();
        });

        // Mobile menu toggle
        document.addEventListener('DOMContentLoaded', function () {
            const menuToggle = document.getElementById('menu-toggle');
            const mobileMenu = document.getElementById('mobile-menu');
            if (menuToggle && mobileMenu) {
                menuToggle.addEventListener('click', function () {
                    mobileMenu.classList.toggle('hidden');
                });
                // Optional: Hide menu when a link is clicked
                mobileMenu.querySelectorAll('a').forEach(link => {
                    link.addEventListener('click', () => {
                        mobileMenu.classList.add('hidden');
                    });
                });
            }
        });
