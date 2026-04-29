// ============================================================
// js/auth.js — Login / Register / Logout
// ============================================================

function switchAuthTab(tab) {
  document.querySelectorAll(".auth-tab").forEach((btn, i) => {
    btn.classList.toggle("active", (i === 0 ? "login" : "register") === tab);
  });
  document.getElementById("authLogin").style.display    = tab === "login"    ? "block" : "none";
  document.getElementById("authRegister").style.display = tab === "register" ? "block" : "none";
}

async function login() {
  const email    = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;
  const errEl    = document.getElementById("loginError");
  errEl.textContent = "";

  if (!email || !password) { errEl.textContent = "Please fill in all fields."; return; }

  try {
    const res = await apiRequest("/users/login", "POST", { email, password });
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("userName", res.data.name);
    initApp(res.data);
  } catch (err) {
    errEl.textContent = err.message;
  }
}

async function register() {
  const name     = document.getElementById("regName").value.trim();
  const email    = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value;
  const errEl    = document.getElementById("registerError");
  errEl.textContent = "";

  if (!name || !email || !password) { errEl.textContent = "Please fill in all fields."; return; }

  try {
    const res = await apiRequest("/users/register", "POST", { name, email, password });
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("userName", res.data.name);
    initApp(res.data);
  } catch (err) {
    errEl.textContent = err.message;
  }
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userName");
  document.getElementById("appScreen").style.display  = "none";
  document.getElementById("authScreen").style.display = "flex";
}
