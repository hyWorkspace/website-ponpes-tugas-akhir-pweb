document.addEventListener("DOMContentLoaded", () => {
  /* ==========================================================
     SHARED: TAHUN FOOTER
     ========================================================== */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ==========================================================
     SHARED: NAVBAR MOBILE
     ========================================================== */
  const navToggle = document.getElementById("nav-toggle");
  const mainNav = document.getElementById("main-nav");

  if (navToggle && mainNav) {
    const resetMenu = () => {
      mainNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Buka menu navigasi");

      const icon = navToggle.querySelector("i");
      if (icon) {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
      }
    };

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

    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", resetMenu);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) resetMenu();
    });
  }

  /* ==========================================================
     SHARED: FORM KONTAK (DEMO)
     ========================================================== */
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const message = document.getElementById("formMessage");
      if (message) {
        message.textContent =
          "Pesan sudah divalidasi di browser. Ini masih demo; pesan belum dikirim ke pengurus pondok.";
      }
      contactForm.reset();
    });
  }

  /* ==========================================================
     SHARED: COUNTER STATISTIK BERANDA
     ========================================================== */
  const counters = document.querySelectorAll(".counter");
  if (counters.length && "IntersectionObserver" in window) {
    const animateCounter = (counter) => {
      const target = Number(counter.dataset.target);
      const duration = 1000;
      const startTime = performance.now();

      const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        counter.textContent = Math.floor(target * easeOut);

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };

      requestAnimationFrame(updateCounter);
    };

    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 },
    );

    counters.forEach((counter) => counterObserver.observe(counter));
  }

  /* ==========================================================
     GALERI: FILTER + LIGHTBOX
     ========================================================== */
  const galleryPage = document.querySelector(".page-galeri");
  if (galleryPage) {
    const thumbs = galleryPage.querySelectorAll(".thumb[data-bg]");
    thumbs.forEach((thumb) => {
      const imagePath = thumb.dataset.bg;
      thumb.style.backgroundImage = `url("${imagePath}"), linear-gradient(135deg, var(--color-background-cream), var(--color-border-dark))`;
    });

    const filterButtons = galleryPage.querySelectorAll("#filters button");
    const items = [...galleryPage.querySelectorAll(".item")];
    const empty = galleryPage.querySelector("#empty");

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        filterButtons.forEach((item) => {
          item.classList.toggle("active", item === button);
        });

        const filter = button.dataset.filter;
        items.forEach((item) => {
          item.classList.toggle(
            "hide",
            filter !== "all" && item.dataset.cat !== filter,
          );
        });

        if (empty) {
          empty.style.display = items.some(
            (item) => !item.classList.contains("hide"),
          )
            ? "none"
            : "block";
        }
      });
    });

    const lightbox = galleryPage.querySelector("#lightbox");
    const lightboxImage = galleryPage.querySelector("#lbImg");
    const lightboxCaption = galleryPage.querySelector("#lbCap");
    const closeButton = galleryPage.querySelector("#lbClose");
    const previousButton = galleryPage.querySelector("#lbPrev");
    const nextButton = galleryPage.querySelector("#lbNext");
    let currentIndex = 0;

    const visibleItems = () =>
      items.filter((item) => !item.classList.contains("hide"));

    const showItem = (list, index) => {
      if (!list.length) return;

      currentIndex = (index + list.length) % list.length;
      const item = list[currentIndex];
      const thumb = item.querySelector(".thumb");

      if (lightboxImage && thumb) {
        lightboxImage.style.backgroundImage = thumb.style.backgroundImage;
      }
      if (lightboxCaption) {
        lightboxCaption.textContent =
          item.querySelector("figcaption")?.textContent || "";
      }
    };

    const closeLightbox = () => {
      lightbox?.classList.remove("open");
      document.body.style.overflow = "";
    };

    const openLightbox = (item) => {
      const list = visibleItems();
      showItem(list, list.indexOf(item));
      lightbox?.classList.add("open");
      document.body.style.overflow = "hidden";
    };

    items.forEach((item) => {
      item.addEventListener("click", () => openLightbox(item));
      item.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openLightbox(item);
        }
      });
    });

    closeButton?.addEventListener("click", closeLightbox);
    previousButton?.addEventListener("click", () => {
      showItem(visibleItems(), currentIndex - 1);
    });
    nextButton?.addEventListener("click", () => {
      showItem(visibleItems(), currentIndex + 1);
    });
    lightbox?.addEventListener("click", (event) => {
      if (event.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", (event) => {
      if (!lightbox?.classList.contains("open")) return;
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") showItem(visibleItems(), currentIndex - 1);
      if (event.key === "ArrowRight") showItem(visibleItems(), currentIndex + 1);
    });
  }

  /* ==========================================================
     PENDIDIKAN / INFORMASI / KEGIATAN: SUBMENU ACTIVE STATE
     ========================================================== */
  document
    .querySelectorAll(".page-pendidikan, .page-informasi, .page-kegiatan")
    .forEach((page) => {
      const links = [...page.querySelectorAll("#side a")];
      if (!links.length || !("IntersectionObserver" in window)) return;

      const sections = links
        .map((link) => document.querySelector(link.getAttribute("href")))
        .filter(Boolean);

      const sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              links.forEach((link) => {
                link.classList.toggle(
                  "active",
                  link.getAttribute("href") === `#${entry.target.id}`,
                );
              });
            }
          });
        },
        { rootMargin: "-30% 0px -60% 0px" },
      );

      sections.forEach((section) => sectionObserver.observe(section));
    });
});
