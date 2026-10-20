document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const message = document.getElementById("formMessage");
      message.textContent =
        "Pesan sudah divalidasi di browser. Ini masih demo; pesan belum dikirim ke pengurus pondok.";
      form.reset();
    });
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");

  const animateCounter = (counter) => {
    const target = Number(counter.dataset.target);
    const duration = 1000;
    const startTime = performance.now();

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Animasi melambat menjelang angka target
      const easeOut = 1 - Math.pow(1 - progress, 3);

      const currentNumber = Math.floor(target * easeOut);

      counter.textContent = currentNumber;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };

    requestAnimationFrame(updateCounter);
  };

  // Jalankan animasi ketika statistik terlihat di layar
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.5
    }
  );

  counters.forEach((counter) => {
    observer.observe(counter);
  });
});