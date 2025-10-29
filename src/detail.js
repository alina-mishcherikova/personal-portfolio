(function () {
  const params = new URLSearchParams(window.location.search);
  const projectId = params.get("id");

  const container = document.getElementById("project-detail-container");

  const project = window.PROJECTS?.find((p) => p.id === projectId);

  const template = document.querySelector("#project-detail");
  let html = template.innerHTML;

  html = html.replaceAll("{{title}}", project.info.title);
  html = html.replaceAll("{{url}}", project.url);
  html = html.replaceAll("{{alt}}", project.alt);
  html = html.replaceAll("{{description}}", project.info.description);
  html = html.replaceAll("{{addPhoto1}}", project.addPhoto1);
  html = html.replaceAll("{{addPhoto2}}", project.addPhoto2);
  html = html.replaceAll("{{developement}}", project.info.developement);
  html = html.replaceAll("{{link}}", project.info.link);
  html = html.replaceAll("{{additionalLink}}", project.info.additionalLink);

  container.innerHTML = html;

  const burgerBtn = document.querySelector("#burger-btn");
  if (burgerBtn) {
    burgerBtn.addEventListener("click", function () {
      let menu = document.querySelector("#nav");
      let header = document.querySelector("header");
      let menuNav = document.querySelector("#logoNav");

      this.classList.toggle("burger-open");

      header.classList.add("align-top");
      header.classList.toggle("items-center");
      header.classList.toggle("items-start");
      menuNav.classList.add("flex-col");
      menu.classList.toggle("hidden");
      menu.classList.toggle("flex");
    });
  }

  const footerImage = document.getElementById("contacts");
  if (footerImage && window.innerWidth >= 768) {
    footerImage.classList.remove("bg-[url('/img/footer-mobile.jpg')]");
    footerImage.classList.add("bg-[url('/img/footer-desktop.jpg')]");
  }
})();
