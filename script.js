const menuButton = document.querySelector("#menu-button");
const siteNav = document.querySelector("#site-nav");
const navLinks = [...siteNav.querySelectorAll("a")];
const revealItems = [...document.querySelectorAll(".reveal")];
const year = document.querySelector("#year");
const mapReel = document.querySelector(".map-reel");
const cityTooltip = document.querySelector(".city-tooltip");
const cityPoints = [...document.querySelectorAll(".city-point")];

menuButton.addEventListener("click", () => {
  const open = document.body.classList.toggle("menu-open");
  menuButton.setAttribute("aria-expanded", String(open));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("menu-open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

year.textContent = new Date().getFullYear();

const showCity = (point) => {
  if (!mapReel || !cityTooltip) return;
  const pointBox = point.getBoundingClientRect();
  const mapBox = mapReel.getBoundingClientRect();
  cityTooltip.textContent = point.dataset.city;
  cityTooltip.style.left = `${pointBox.left - mapBox.left + pointBox.width / 2}px`;
  cityTooltip.style.top = `${pointBox.top - mapBox.top}px`;
  cityTooltip.classList.add("is-visible");
};

const hideCity = () => cityTooltip?.classList.remove("is-visible");

cityPoints.forEach((point) => {
  point.addEventListener("pointerenter", () => showCity(point));
  point.addEventListener("pointerleave", hideCity);
  point.addEventListener("focus", () => showCity(point));
  point.addEventListener("blur", hideCity);
});
