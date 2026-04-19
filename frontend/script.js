const API_BASE = `${window.location.origin}/api`;

const projectsGrid = document.getElementById("projectsGrid");
const projectFeedback = document.getElementById("projectFeedback");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const filterGroup = document.getElementById("filterGroup");
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

let allProjects = [];
let activeFilter = "all";

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function parseTechnologies(technologies) {
  if (!technologies) {
    return [];
  }

  return technologies
    .split(",")
    .map((tech) => tech.trim())
    .filter(Boolean);
}

function renderProjects(projects) {
  if (!projects.length) {
    projectsGrid.innerHTML = "";
    projectFeedback.textContent = "No projects match this filter yet.";
    return;
  }

  projectFeedback.textContent = `${projects.length} project${projects.length > 1 ? "s" : ""} available.`;

  projectsGrid.innerHTML = projects
    .map((project) => {
      const technologies = parseTechnologies(project.technologies);

      return `
        <article class="project-card glass-card">
          <div class="project-image">
            <img src="${escapeHtml(project.image_url)}" alt="${escapeHtml(project.title)} preview" loading="lazy" />
          </div>
          <h3>${escapeHtml(project.title)}</h3>
          <p>${escapeHtml(project.description)}</p>
          <div class="project-tech">
            ${technologies.map((tech) => `<span>${escapeHtml(tech)}</span>`).join("")}
          </div>
          <div class="project-links">
            <a class="project-link" href="${escapeHtml(project.github_link)}" target="_blank" rel="noreferrer">GitHub</a>
            <a class="project-link" href="${escapeHtml(project.live_link)}" target="_blank" rel="noreferrer">Live Demo</a>
          </div>
        </article>
      `;
    })
    .join("");
}

function applyProjectFilter(filter) {
  activeFilter = filter;
  const filtered =
    filter === "all"
      ? allProjects
      : allProjects.filter((project) =>
          parseTechnologies(project.technologies)
            .map((tech) => tech.toLowerCase())
            .includes(filter.toLowerCase())
        );

  renderProjects(filtered);
}

async function loadProjects() {
  try {
    projectFeedback.textContent = "Loading featured projects...";

    const response = await fetch(`${API_BASE}/projects`);

    if (!response.ok) {
      throw new Error("Unable to load projects right now.");
    }

    const payload = await response.json();
    allProjects = payload.data || [];
    applyProjectFilter(activeFilter);
  } catch (error) {
    projectFeedback.textContent =
      "Projects could not be loaded. Start the backend server and make sure the database is configured.";
    projectsGrid.innerHTML = "";
  }
}

function validateForm(data) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!data.name.trim() || !data.email.trim() || !data.message.trim()) {
    return "Please complete all fields before sending your message.";
  }

  if (!emailPattern.test(data.email.trim())) {
    return "Please enter a valid email address.";
  }

  return null;
}

async function handleFormSubmit(event) {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const payload = {
    name: formData.get("name")?.toString() || "",
    email: formData.get("email")?.toString() || "",
    message: formData.get("message")?.toString() || "",
  };

  const validationError = validateForm(payload);
  formStatus.className = "form-status";

  if (validationError) {
    formStatus.textContent = validationError;
    formStatus.classList.add("error");
    return;
  }

  try {
    formStatus.textContent = "Sending your message...";

    const response = await fetch(`${API_BASE}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Something went wrong.");
    }

    contactForm.reset();
    formStatus.textContent = "Message sent successfully. Thanks for reaching out.";
    formStatus.classList.add("success");
  } catch (error) {
    formStatus.textContent = error.message || "Unable to send your message right now.";
    formStatus.classList.add("error");
  }
}

function setInitialTheme() {
  const storedTheme = localStorage.getItem("portfolio-theme");

  if (storedTheme === "light") {
    document.body.classList.add("light-theme");
  }
}

function toggleTheme() {
  document.body.classList.toggle("light-theme");
  const isLight = document.body.classList.contains("light-theme");
  localStorage.setItem("portfolio-theme", isLight ? "light" : "dark");
}

filterGroup?.addEventListener("click", (event) => {
  const button = event.target.closest(".filter-chip");

  if (!button) {
    return;
  }

  document.querySelectorAll(".filter-chip").forEach((chip) => chip.classList.remove("active"));
  button.classList.add("active");
  applyProjectFilter(button.dataset.filter || "all");
});

menuToggle?.addEventListener("click", () => {
  nav.classList.toggle("open");
});

nav?.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    nav.classList.remove("open");
  }
});

themeToggle?.addEventListener("click", toggleTheme);
contactForm?.addEventListener("submit", handleFormSubmit);

setInitialTheme();
loadProjects();
