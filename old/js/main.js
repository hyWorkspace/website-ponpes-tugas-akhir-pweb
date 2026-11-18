document.addEventListener("DOMContentLoaded", () => {
  // Atur tahun di footer ototomatis
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Toggle menu navigasi

  const navToggle = document.getElementById("nav-toggle");
  const mainNav = document.getElementById("main-nav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");

      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute(
        "aria-label",
        isOpen ? "Tutup menu navigasi" : "Buka menu navigasi",
      );

      const icon = navToggle.querySelector("i");

      if (icon) {
        icon.classList.toggle("fa-bars", !isOpen);
        icon.classList.toggle("fa-xmark", isOpen);
      }
    });

    // Tutup menu setelah salah satu link diklik
    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Buka menu navigasi");

        const icon = navToggle.querySelector("i");

        if (icon) {
          icon.classList.remove("fa-xmark");
          icon.classList.add("fa-bars");
        }
      });
    });

    // Tutup menu jika ukuran layar kembali ke desktop
    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) {
        mainNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");

        const icon = navToggle.querySelector("i");

        if (icon) {
          icon.classList.remove("fa-xmark");
          icon.classList.add("fa-bars");
        }
      }
    });
  }

  // Validasi form kontak (demo)
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
      threshold: 0.5,
    },
  );

  counters.forEach((counter) => {
    observer.observe(counter);
  });
});
