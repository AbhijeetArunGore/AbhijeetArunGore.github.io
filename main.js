/**
 * Portfolio 2.0 Main Application Controller
 * Handles Navigation, Active Section Spy, Lab Tabs, and UI interactions.
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initLabTabs();
  initScrollSpy();
  initCopyEmail();
});

// Mobile Navigation Toggle
function initNavbar() {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const header = document.getElementById("header");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      const expanded = hamburger.getAttribute("aria-expanded") === "true";
      hamburger.setAttribute("aria-expanded", !expanded);
      navLinks.classList.toggle("active");
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Header Scroll Elevation
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header?.classList.add("header-scrolled");
    } else {
      header?.classList.remove("header-scrolled");
    }
  }, { passive: true });
}

// Lab Tab Switcher
function initLabTabs() {
  const triggers = document.querySelectorAll(".lab-tab-trigger");
  const panels = document.querySelectorAll(".lab-tab-panel");

  triggers.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-tab");

      triggers.forEach(t => t.classList.remove("active"));
      panels.forEach(p => p.classList.remove("active"));

      btn.classList.add("active");
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add("active");
      }
    });
  });
}

// Active Section Scroll Spy
function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a[href^='#']");

  function spy() {
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", spy, { passive: true });
  spy();
}

// Copy Email Utility
function initCopyEmail() {
  document.querySelectorAll(".btn-copy-email").forEach(btn => {
    btn.addEventListener("click", () => {
      const email = "abhijeetarungore@gmail.com";
      navigator.clipboard.writeText(email).then(() => {
        const originalHtml = btn.innerHTML;
        btn.innerHTML = `<i class="fas fa-check"></i> Email Copied!`;
        btn.classList.add("btn-copied");
        setTimeout(() => {
          btn.innerHTML = originalHtml;
          btn.classList.remove("btn-copied");
        }, 2200);
      }).catch(err => {
        window.location.href = `mailto:${email}`;
      });
    });
  });
}
