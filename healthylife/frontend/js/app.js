// ============================================================
// js/app.js — App Init, Navigation, Bootstrap
// ============================================================

function navigate(page) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById("page-" + page).classList.add("active");
  document.querySelectorAll(".nav-link").forEach(l => {
    l.classList.toggle("active", l.dataset.page === page);
  });
}

function initApp(user) {
  document.getElementById("authScreen").style.display = "none";
  document.getElementById("appScreen").style.display  = "flex";

  // Set user info in sidebar
  const name = user?.name || localStorage.getItem("userName") || "User";
  document.getElementById("userName").textContent = name;
  document.getElementById("userAvatar").textContent = name.charAt(0).toUpperCase();

  // Render all pages
  renderDashboard();
  renderPlanPage();
  renderTrackerPage();
  renderChatPage();
  renderDiaryPage();

  navigate("dashboard");
}

// Auto-login if token exists
window.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  if (token) {
    initApp({ name: localStorage.getItem("userName") });
  }
});
