/**
 * BVA Site - Main JavaScript (vanilla, no dependencies)
 * Replaces jQuery + Divi theme JS + various plugins
 */
(function () {
  "use strict";

  /* ── Mobile Menu Toggle ─────────────────────────────── */
  function initMobileMenu() {
    var container = document.querySelector(".et_slide_in_menu_container");
    if (!container) return;

    document.querySelectorAll(".et_toggle_fullscreen_menu").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        container.classList.toggle("et_pb_fullscreen_menu_opened");
        document.body.classList.toggle("et_pb_fullscreen_menu_active");
      });
    });

    // Close menu when clicking a nav link
    container.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        container.classList.remove("et_pb_fullscreen_menu_opened");
        document.body.classList.remove("et_pb_fullscreen_menu_active");
      });
    });
  }

  /* ── Scroll-to-Top Button ───────────────────────────── */
  function initScrollToTop() {
    var btn = document.querySelector(".et_pb_scroll_top");
    if (!btn) return;

    window.addEventListener("scroll", function () {
      if (window.scrollY > 300) {
        btn.style.display = "block";
        btn.style.opacity = "1";
      } else {
        btn.style.opacity = "0";
        setTimeout(function () {
          if (window.scrollY <= 300) btn.style.display = "none";
        }, 300);
      }
    });

    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ── Scroll-Down Button ─────────────────────────────── */
  function initScrollDown() {
    document.querySelectorAll(".scroll-down-container, a.scroll-down").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        var nextSection = this.closest(".et_pb_section");
        if (nextSection && nextSection.nextElementSibling) {
          nextSection.nextElementSibling.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  }

  /* ── Lightbox ───────────────────────────────────────── */
  function initLightbox() {
    var overlay = null;
    var img = null;
    var caption = null;
    var galleryImages = [];
    var currentIndex = 0;

    function createOverlay() {
      overlay = document.createElement("div");
      overlay.className = "bva-lightbox-overlay";
      overlay.innerHTML =
        '<div class="bva-lightbox-close">&times;</div>' +
        '<div class="bva-lightbox-prev">&#8249;</div>' +
        '<div class="bva-lightbox-next">&#8250;</div>' +
        '<img class="bva-lightbox-img" />' +
        '<div class="bva-lightbox-caption"></div>';
      document.body.appendChild(overlay);

      img = overlay.querySelector(".bva-lightbox-img");
      caption = overlay.querySelector(".bva-lightbox-caption");

      overlay.querySelector(".bva-lightbox-close").addEventListener("click", close);
      overlay.querySelector(".bva-lightbox-prev").addEventListener("click", prev);
      overlay.querySelector(".bva-lightbox-next").addEventListener("click", next);
      overlay.addEventListener("click", function (e) {
        if (e.target === overlay) close();
      });

      document.addEventListener("keydown", function (e) {
        if (!overlay || overlay.style.display !== "flex") return;
        if (e.key === "Escape") close();
        if (e.key === "ArrowLeft") prev();
        if (e.key === "ArrowRight") next();
      });
    }

    function open(src, captionText, images, index) {
      if (!overlay) createOverlay();
      galleryImages = images || [{ src: src, caption: captionText }];
      currentIndex = index || 0;
      show(galleryImages[currentIndex]);
      overlay.style.display = "flex";
      document.body.style.overflow = "hidden";

      var hasNav = galleryImages.length > 1;
      overlay.querySelector(".bva-lightbox-prev").style.display = hasNav ? "block" : "none";
      overlay.querySelector(".bva-lightbox-next").style.display = hasNav ? "block" : "none";
    }

    function show(item) {
      img.src = item.src;
      caption.textContent = item.caption || "";
      caption.style.display = item.caption ? "block" : "none";
    }

    function close() {
      overlay.style.display = "none";
      document.body.style.overflow = "";
    }

    function prev() {
      currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
      show(galleryImages[currentIndex]);
    }

    function next() {
      currentIndex = (currentIndex + 1) % galleryImages.length;
      show(galleryImages[currentIndex]);
    }

    // Divi lightbox images (index.html and burgschanke page)
    document.querySelectorAll(".et_pb_lightbox_image").forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        open(this.href, this.getAttribute("title"));
      });
    });

    // Divi gallery images (burgschanke page slider)
    document.querySelectorAll(".et_pb_gallery_image a").forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        var allLinks = Array.from(document.querySelectorAll(".et_pb_gallery_image a"));
        var images = allLinks.map(function (a) {
          return { src: a.href, caption: a.getAttribute("title") || "" };
        });
        var idx = allLinks.indexOf(this);
        open(this.href, this.getAttribute("title"), images, idx);
      });
    });

    // Modula gallery images (galerie page) — attach to the item div directly
    document.querySelectorAll(".modula-item").forEach(function (item) {
      item.style.cursor = "pointer";
      item.addEventListener("click", function (e) {
        e.preventDefault();
        var imgEl = this.querySelector("img");
        if (!imgEl) return;

        var allItems = Array.from(document.querySelectorAll(".modula-item"));
        var images = allItems.map(function (el) {
          var i = el.querySelector("img");
          return {
            src: i ? (i.getAttribute("data-full") || i.src) : "",
            caption: i ? (i.getAttribute("data-caption") || i.getAttribute("title") || "") : "",
          };
        }).filter(function (item) { return item.src; });

        var idx = allItems.indexOf(this);
        open(imgEl.getAttribute("data-full") || imgEl.src, "", images, idx);
      });
    });
  }

  /* ── Lazy Loading (convert data-src to native) ──────── */
  function initLazyLoading() {
    document.querySelectorAll("img.lazyload[data-src]").forEach(function (img) {
      img.src = img.getAttribute("data-src");
      img.setAttribute("loading", "lazy");
      img.classList.remove("lazyload");
      img.classList.add("lazyloaded");
    });
  }

  /* ── Scroll Animations (IntersectionObserver) ───────── */
  function initAnimations() {
    // Handle .et_animated elements (index.html hero images) — hidden via CSS opacity:0
    document.querySelectorAll(".et_animated").forEach(function (el) {
      el.classList.remove("et_animated");
      el.classList.add("et_had_animation");
      el.style.opacity = "1";
      el.style.visibility = "visible";
    });

    // Handle .et-waypoint elements with animation classes (die-burg, um-die-burg blurb images)
    // These need .et-animated class added to trigger the CSS rule that sets opacity:1
    var waypoints = document.querySelectorAll(".et-waypoint[class*='et_pb_animation_']");
    if (!waypoints.length) return;

    function revealWaypoint(el) {
      el.classList.add("et-animated");
    }

    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              revealWaypoint(entry.target);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );
      waypoints.forEach(function (el) { observer.observe(el); });
    } else {
      waypoints.forEach(revealWaypoint);
    }
  }

  /* ── Modula Gallery Init (galerie page) ───────────────── */
  function initModulaGallery() {
    document.querySelectorAll(".modula.modula-gallery").forEach(function (gallery) {
      // Mark as initialized so CSS removes visibility:hidden
      gallery.classList.add("modula-gallery-initialized");

      var container = gallery.querySelector(".modula-items");
      if (!container) return;

      // Switch from absolute positioning to CSS grid
      container.style.position = "relative";
      container.style.display = "grid";
      container.style.gridTemplateColumns = "repeat(auto-fill, minmax(280px, 1fr))";
      container.style.gap = "10px";
      container.style.height = "auto";
      container.style.visibility = "visible";

      container.querySelectorAll(".modula-item").forEach(function (item) {
        // Remove absolute positioning
        item.style.position = "relative";
        item.style.width = "100%";
        item.style.height = "auto";
        item.style.overflow = "hidden";

        // Mark as loaded so CSS sets content opacity to 1
        item.classList.add("tg-loaded");

        // Make content visible
        var content = item.querySelector(".modula-item-content");
        if (content) {
          content.style.opacity = "1";
          content.style.transform = "none";
          content.style.height = "auto";
          content.style.position = "relative";
        }

        // Make the image flow naturally
        var img = item.querySelector("img.pic");
        if (img) {
          img.style.position = "relative";
          img.style.width = "100%";
          img.style.height = "auto";
          img.style.display = "block";
          img.style.maxWidth = "100%";
        }
      });
    });
  }

  /* ── Gallery Slider (burgschanke page) ──────────────── */
  function initGallerySlider() {
    document.querySelectorAll(".et_pb_slider.et_slider_auto").forEach(function (slider) {
      var items = slider.querySelectorAll(".et_pb_gallery_item");
      if (items.length < 2) return;

      var current = 0;
      items.forEach(function (item, i) {
        item.style.display = i === 0 ? "block" : "none";
      });

      var speed = 5000;
      var speedClass = Array.from(slider.classList).find(function (c) {
        return c.startsWith("et_slider_speed_");
      });
      if (speedClass) speed = parseInt(speedClass.replace("et_slider_speed_", ""), 10) || 5000;

      setInterval(function () {
        items[current].style.display = "none";
        current = (current + 1) % items.length;
        items[current].style.display = "block";
      }, speed);
    });
  }

  /* ── Fix Logo Dimensions ──────────────────────────────── */
  function initLogo() {
    var logo = document.getElementById("logo");
    if (!logo) return;
    // Divi exported width="0" height="0"; remove those so the SVG renders naturally
    if (logo.getAttribute("width") === "0") logo.removeAttribute("width");
    if (logo.getAttribute("height") === "0") logo.removeAttribute("height");
  }

  /* ── Fixed Header on Scroll ─────────────────────────── */
  function initFixedHeader() {
    var header = document.getElementById("main-header");
    if (!header) return;

    window.addEventListener("scroll", function () {
      if (window.scrollY > 0) {
        header.classList.add("et-fixed-header");
      } else {
        header.classList.remove("et-fixed-header");
      }
    });
  }

  /* ── Init all ───────────────────────────────────────── */
  document.addEventListener("DOMContentLoaded", function () {
    initLogo();
    initMobileMenu();
    initScrollToTop();
    initScrollDown();
    initLightbox();
    initLazyLoading();
    initModulaGallery();
    initAnimations();
    initGallerySlider();
    initFixedHeader();
  });
})();
