//change hero photo based on screen size
let M = {};
M.projects = window.PROJECTS || [];

let V = {};
V.updateHeroImage = function (heroImage) {
  if (!heroImage) return;

  if (window.innerWidth >= 768) {
    heroImage.classList.remove("bg-[url('/img/hero-mobile.jpg')]");
    heroImage.classList.add("bg-[url('/img/hero-desktop.jpg')]");
  } else {
    heroImage.classList.remove("bg-[url('/img/hero-desktop.jpg')]");
    heroImage.classList.add("bg-[url('/img/hero-mobile.jpg')]");
  }
};

V.updateFooterImage = function (footerImage) {
  if (!footerImage) return;

  if (window.innerWidth >= 768) {
    footerImage.classList.remove("bg-[url('/img/footer-mobile.jpg')]");
    footerImage.classList.add("bg-[url('/img/footer-desktop.jpg')]");
  } else {
    footerImage.classList.remove("bg-[url('/img/footer-desktop.jpg')]");
    footerImage.classList.add("bg-[url('/img/footer-mobile.jpg')]");
  }
};
V.formatTag = function (tag) {
  let template = document.querySelector("#project-tag");
  let html = template.innerHTML;

  html = html.replaceAll("{{tag}}", tag);
  return html;
};

V.formatProject = function (p) {
  let template = document.querySelector("#project-template");
  let html = template.innerHTML;

  let tagsHtml = "";
  for (let i = 0; i < p.tags.length; i++) {
    tagsHtml += V.formatTag(p.tags[i]);
  }

  html = html.replaceAll("{{id}}", p.id);
  html = html.replaceAll("{{url}}", p.url);
  html = html.replaceAll("{{title}}", p.info.title);
  html = html.replaceAll("{{date}}", p.info.date);
  html = html.replaceAll("{{tags}}", tagsHtml);
  html = html.replaceAll("{{alt}}", p.alt);
  html = html.replaceAll("{{pagelink}}", p.pagelink);

  return html;
};
V.formatProjectDetail = function (p) {
  let template = document.querySelector("#project-detail");
  let html = template.innerHTML;

  html = html.replaceAll("{{url}}", p.url);
  html = html.replaceAll("{{title}}", p.info.title);
  html = html.replaceAll("{{description}}", p.info.description);
  html = html.replaceAll("{{developement}}", p.info.developement);
  html = html.replaceAll("{{addPhoto1}}", p.addPhoto1);
  html = html.replaceAll("{{addPhoto2}}", p.addPhoto2);
  html = html.replace("{{link}}", p.info.link);
  html = html.replace("{{additionalLink}}", p.info.additionalLink);
  document.querySelector("section").innerHTML = html;
};

V.renderProject = function (data) {
  let allHtmlItem = "";
  for (let i = 0; i < data.length; i++) {
    allHtmlItem += V.formatProject(data[i]);
  }
  document.querySelector("#projects").innerHTML = allHtmlItem;

  V.attachProjectClickHandlers();
};

V.attachProjectClickHandlers = function () {
  const projectCards = document.querySelectorAll("#projects article[data-id]");
  projectCards.forEach((card) => {
    card.addEventListener("click", function () {
      const projectId = this.getAttribute("data-id");
      window.location.href = `detail.html?id=${encodeURIComponent(projectId)}`;
    });
  });
};

V.init = function () {
  let heroImage = document.getElementById("hero-img");
  let footerImage = document.getElementById("contacts");
  let burgernav = document.querySelector("#burger-btn");

  if (burgernav) {
    burgernav.addEventListener("click", C.BurgerButtonHandler);
  }

  V.updateHeroImage(heroImage);
  V.updateFooterImage(footerImage);

  let resizeTimeout;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function () {
      V.updateHeroImage(heroImage);
      V.updateFooterImage(footerImage);
    }, 150);
  });

  V.renderProject(M.projects);
};

let C = {};

C.init = function () {
  V.init();
};

C.BurgerButtonHandler = function () {
  let menu = document.querySelector("#nav");
  let header = document.querySelector("header");
  let menuNav = document.querySelector("#logoNav");
  let burgerBtn = document.querySelector("#burger-btn");

  // Toggle burger animation
  burgerBtn.classList.toggle("burger-open");

  header.classList.add("align-top");
  header.classList.toggle("items-center");
  header.classList.toggle("items-start");
  menuNav.classList.add("flex-col");
  menu.classList.toggle("hidden");
  menu.classList.toggle("flex");
};

C.init();
