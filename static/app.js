  const businessHours = {
    Mo: [10, 18],
    Tu: [10, 18],
    We: [10, 18],
    Th: [10, 18],
    Fr: [10, 18],
    Sa: [10, 16],
    Su: null // Closed on Sunday
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
      statusDiv.textContent = `Closed – Opens on ${nextOpenDay} at ${formatTime(businessHours[nextOpenDay][0])}`;
      return;
    }

    const [open, close] = openHours;
    const currentHour = now.getHours() + now.getMinutes() / 60;

    if (currentHour >= open && currentHour < close) {
      statusDiv.textContent = `✅ Open Now – Closes at ${formatTime(close)}`;
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

      statusDiv.textContent = `⛔ Closed – Opens in ${hrs}h ${mins}m`;
    }
  }

  updateBusinessStatus();
  setInterval(updateBusinessStatus, 60000); // refresh every 1 min
