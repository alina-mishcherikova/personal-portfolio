//change hero photo based on screen size
let M = {};
M.projects = [
  {
    id: "1",
    tags: ["Front End", "Back End", "LAPM"],
    url: "gestion_de_film_lamp.webp",
    addPhoto1: "gestion_de_film_1.webp",
    addPhoto2: "gestion_de_film_2.webp",
    alt: "mackbook pro with site streaming",
    info: {
      title: "[EDU] Développement d'un site de gestion de films",
      photo: "./asset/project.png",
      description:
        "Ce projet consistait à concevoir et développer une application web de gestion de films. J'ai travaillé sur la mise en place de la structure du site, l'évolution de la base de données, ainsi que sur l'ajout progressif de fonctionnalités côté utilisateur et administrateur. Le projet s'est conclu par l'hébergement sécurisé sur un serveur LAMP, avec une protection par mot de passe pour l'espace administrateur.",
      developement:
        " Ce projet m'a permis de comprendre toutes les étapes du développement d'un site web, de la conception à la mise en ligne. J'y ai renforcé mes compétences en développement, gestion de base de données et hébergement sécurisé. Grâce au travail par itérations et à l'utilisation de GitHub, j'ai appris à mieux organiser mon code et à collaborer efficacement. La mise en place du certificat SSL et la protection de l'espace administrateur m'ont également sensibilisée aux bonnes pratiques de sécurité web.",
      date: "avril 2025",
      buttontext: "Voir le code source",
      link: "https://github.com/alina-mishcherikova/SAE2.03-mishcherikova",
      additionalLink: "https://mishcherikova-sae203.mmi-limoges.fr/",
    },
  },
  {
    id: "2",

    tags: ["Figma", "Communication", "Trello"],
    url: "anne-frank-thumbnail.webp",
    addPhoto1: "wireframe-anne-franc.png",
    addPhoto2: "trello-anne-frank.png",
    alt: "mackbook with Anne Frank project",
    info: {
      title: "[EDU] Concevoir une recommandation de communication numérique",
      photo: "./asset/project.png",
      description:
        "Ce projet consistait à concevoir une page web promotionnelle pour l'expérience VR Anne Frank House. Le travail incluait l'analyse du public cible, la création de personae, la définition d'une stratégie marketing et communicationnelle ainsi que la réalisation d'un wireframe et de prototypes fonctionnels sur Figma. Une étude concurrentielle et une analyse des réseaux sociaux venaient compléter la préparation du contenu et l'organisation du site.",
      developement:
        "Dans un premier temps, j'dai réalisé une définition de mon public cible par la création d'dune persona et de user stories, ce qui m'da permis d'didentifier clairement les attentes et besoins utilisateurs. Sur cette base, j'dai proposé des recommandations marketing appropriées en précisant des objectifs et des points de contacts pertinents.<br /> <br />J'dai aussi analysé trois sites concurrents ainsi qu'dun site inspirant. Cette étape m'da permis de m'dinformer sur les bonnes pratiques et les points d'damélioration, ce qui m'da aidée à établir une stratégie de communication cohérente. J'dai ensuite défini un type de site, organisé le contenu par le zoning et proposé un wireframe avec des prototypes interactifs.<br /><br />La réalisation a été faite sur Figma où j'dai conçu l'densemble des maquettes, prototypes ainsi qu'dun kit UX UI pour les besoins d'dexpression d'dune identité visuelle homogène et d'dune navigation fluide. Ce projet m'da permis de concilier analyse, stratégie digitale et design tout en consolidant mes compétences en UX UI ainsi qu'den collaboration.",
      date: "décembre 2024",
      buttontext: "Voir le prototype Figma",
      link: "https://www.figma.com/proto/3fHQQW3k2ioDSL9qVyip9c/SA%C3%A9-1.02?node-id=155-2063&t=NdtjcoNn6sNmnM09-1",
      additionalLink: "",
    },
  },
];

let V = {};

V.formatTag = function (tag) {
  let template = document.querySelector("#project-tag");
  let html = template.innerHTML;

  html = html.replaceAll("{{tag}}", tag);
  return html;
};

V.formatProject = function (p) {
  console.log("formatting project:", p);
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
  if (!template) return "";

  let html = template.innerHTML;

  html = html.replaceAll("{{url}}", p.url);
  html = html.replaceAll("{{title}}", p.info.title);
  html = html.replaceAll("{{description}}", p.info.description);
  html = html.replaceAll("{{developement}}", p.info.developement);
  html = html.replaceAll("{{addPhoto1}}", p.addPhoto1);
  html = html.replaceAll("{{addPhoto2}}", p.addPhoto2);
  html = html.replace("{{link}}", p.info.link);
  html = html.replace("{{additionalLink}}", p.info.additionalLink);
  html = html.replaceAll("{{buttontext}}", p.info.buttontext);
  html = html.replaceAll("{{alt}}", p.alt || p.info.title);

  return html;
};

V.openProjectModal = function (projectId) {
  const proj = M.projects.find((p) => p.id === projectId);
  if (!proj) return;

  const modal = document.querySelector("#project-modal");
  const content = document.querySelector("#project-modal-content");

  content.innerHTML = V.formatProjectDetail(proj);

  const liAdditionalLink = content.querySelector("#liAdditionalLink");

  if (!proj.info.additionalLink) {
    if (liAdditionalLink) liAdditionalLink.classList.add("hidden");
  } else {
    if (liAdditionalLink) liAdditionalLink.classList.remove("hidden");
  }

  if (modal) {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  }
};

V.closeProjectModal = function () {
  const modal = document.querySelector("#project-modal");
  const content = document.querySelector("#project-modal-content");
  if (!modal) return;

  modal.classList.add("hidden");
  modal.classList.remove("flex");
  content.innerHTML = "";
};

V.attachProjectClickHandlers = function () {
  const container = document.querySelector("#projects");
  if (!container) return;

  container.addEventListener("click", function (e) {
    const article = e.target.closest("article[data-id]");
    if (!article) return;

    const id = article.dataset.id;
    V.openProjectModal(id);
  });

  const closeBtn = document.querySelector("#modal-close");
  if (closeBtn) {
    closeBtn.addEventListener("click", V.closeProjectModal);
  }

  const modal = document.querySelector("#project-modal");
  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        V.closeProjectModal();
      }
    });
  }
};

V.renderProject = function (data) {
  console.log("im here");
  let allHtmlItem = "";
  for (let i = 0; i < data.length; i++) {
    console.log(data.length);
    console.log(data);
    console.log(data[i]);
    allHtmlItem += V.formatProject(data[i]);
  }
  document.querySelector("#projects").innerHTML = allHtmlItem;
};

V.init = function () {
  let burgernav = document.querySelector("#burger-btn");

  if (burgernav) {
    burgernav.addEventListener("click", C.BurgerButtonHandler);
  }

  V.renderProject(M.projects);
  V.attachProjectClickHandlers();
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
  header.classList.toggle("items-start");
  menuNav.classList.add("flex-col");
  menu.classList.toggle("hidden");
  menu.classList.toggle("flex");
};

C.init();
