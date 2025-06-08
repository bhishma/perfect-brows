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

// Business hours status script
        const businessHours = {
    Mo: [10, 19],
    Tu: [10, 19],
    We: [10, 19],
    Th: [10, 19],
    Fr: [10, 19],
    Sa: [10, 19],
    Su: [11, 17]
  };

  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  function formatTime(hour) {
    const h = Math.floor(hour);
    const m = (hour % 1) * 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  }

  function updateBusinessStatus() {
    const now = new Date();
    const today = days[now.getDay()];
    const statusDiv = document.getElementById("business-status");
    const openHours = businessHours[today];

    // SVGs as strings
    const openSVG = `<img src="static/open.svg" alt="Open" style="display:inline;width:2em;height:2em;vertical-align:middle;margin-right:0.4em;">`;
    const closedSVG = `<img src="static/closed.svg" alt="Closed" style="display:inline;width:2em;height:2em;vertical-align:middle;margin-right:0.4em;">`;

    if (!openHours) {
      // Find next open day
      let nextOpenDay = null;
      for (let i = 1; i <= 7; i++) {
        const day = days[(now.getDay() + i) % 7];
        if (businessHours[day]) {
          nextOpenDay = day;
          break;
        }
      }
      statusDiv.innerHTML = closedSVG + `<br>Opens on ${nextOpenDay} at ${formatTime(businessHours[nextOpenDay][0])}`;
      return;
    }

    const [open, close] = openHours;
    const currentHour = now.getHours() + now.getMinutes() / 60;

    if (currentHour >= open && currentHour < close) {
      statusDiv.innerHTML = openSVG + `<br>Closes at ${formatTime(close)}`;
    } else {
      // Show time until open
      const openTime = new Date(now);
      openTime.setHours(open, 0, 0, 0);
      if (currentHour >= close) openTime.setDate(now.getDate() + 1);

      let nextOpenDay = today;
      let i = 1;
      while (
        (openTime <= now || !businessHours[nextOpenDay]) &&
        i <= 7
      ) {
        nextOpenDay = days[(now.getDay() + i) % 7];
        i++;
        if (businessHours[nextOpenDay]) {
          openTime.setDate(now.getDate() + i - 1);
          openTime.setHours(businessHours[nextOpenDay][0], 0, 0, 0);
        }
      }

      const diff = Math.max(openTime - now, 0);
      const hrs = Math.floor(diff / 1000 / 60 / 60);
      const mins = Math.floor((diff / 1000 / 60) % 60);

      statusDiv.innerHTML = closedSVG + `<br>Opens in ${hrs}h ${mins}m`;
    }
  }

  updateBusinessStatus();
  setInterval(updateBusinessStatus, 60000); // refresh every 1 min
