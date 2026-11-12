// =========================================
// 1. SELETORES
// =========================================

const themeToggle = document.getElementById("theme-toggle");
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const currentYear = document.getElementById("current-year");

const root = document.documentElement;

// =========================================
// 2. CONFIGURAÇÃO DO TEMA
// =========================================

const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

function getPreferredTheme() {
  const savedTheme = localStorage.getItem("portfolio-theme");

  if (savedTheme === "dark" || savedTheme === "light") {
    return savedTheme;
  }

  return systemTheme.matches ? "dark" : "light";
}

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);

  themeToggle.textContent = theme === "dark" ? "☀" : "☾";

  themeToggle.setAttribute(
    "aria-label",
    theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro",
  );
}

applyTheme(getPreferredTheme());

themeToggle.addEventListener("click", () => {
  const currentTheme = root.getAttribute("data-theme");

  const newTheme = currentTheme === "dark" ? "light" : "dark";

  localStorage.setItem("portfolio-theme", newTheme);

  applyTheme(newTheme);
});

// Atualiza o tema automaticamente quando o usuário
// não possui uma preferência manual salva.

systemTheme.addEventListener("change", (event) => {
  const savedTheme = localStorage.getItem("portfolio-theme");

  if (!savedTheme) {
    applyTheme(event.matches ? "dark" : "light");
  }
});

// =========================================
// 3. MENU MOBILE
// =========================================

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("active");

  menuToggle.setAttribute("aria-expanded", String(isOpen));

  menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");

  menuToggle.textContent = isOpen ? "✕" : "☰";
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");

    menuToggle.textContent = "☰";
  });
});

// =========================================
// 4. ANO AUTOMÁTICO
// =========================================

currentYear.textContent = new Date().getFullYear();
