// ============================================================
// js/tracker.js — Daily Health Tracker Page
// ============================================================

const GOALS = { steps: 10000, water: 2.5, calories: 500, sleep: 8 };
let todayData = { steps: 0, water: 0, calories: 0, sleep: 0 };

function renderTrackerPage() {
  document.getElementById("page-tracker").innerHTML = `
    <h1 class="page-heading">Daily Tracker</h1>
    <p class="page-sub">Log your steps, water, calories, and sleep every day.</p>

    <div class="card">
      <div class="section-label">Log today's activity</div>
      <div class="tracker-grid">
        ${trackerCard("steps",    "Steps",         "👟", "steps",    "steps",   10000,  "0")}
        ${trackerCard("water",    "Water intake",  "💧", "L",        "water",   2.5,    "0", "var(--blue)")}
        ${trackerCard("calories", "Calories burned","🔥","kcal",     "calories",500,   "0", "var(--coral)")}
        ${trackerCard("sleep",    "Sleep hours",   "😴", "hrs",      "sleep",   8,      "0", "var(--purple)")}
      </div>
    </div>

    <div class="card">
      <div class="section-label">Today's summary</div>
      <div class="stats-row">
        <div class="stat-pill"><div class="stat-val" id="stat-steps">0</div><div class="stat-lbl">Steps</div></div>
        <div class="stat-pill"><div class="stat-val" id="stat-water" style="color:var(--blue)">0L</div><div class="stat-lbl">Water</div></div>
        <div class="stat-pill"><div class="stat-val" id="stat-calories" style="color:var(--coral)">0</div><div class="stat-lbl">Calories</div></div>
        <div class="stat-pill"><div class="stat-val" id="stat-sleep" style="color:var(--purple)">0h</div><div class="stat-lbl">Sleep</div></div>
      </div>
    </div>
  `;

  loadTodayHealth();
}

function trackerCard(id, title, icon, unit, key, goal, placeholder, barColor = "var(--green)") {
  return `
    <div class="tracker-card">
      <div class="tracker-header">
        <span class="tracker-title">${title}</span>
        <span class="tracker-icon">${icon}</span>
      </div>
      <div class="tracker-input-row">
        <input type="number" id="input-${id}" placeholder="${placeholder}" min="0" step="${unit === 'L' || unit === 'hrs' ? '0.1' : '1'}">
        <span class="unit-label">${unit}</span>
        <button class="btn-secondary" onclick="logMetric('${key}')">Log</button>
      </div>
      <div class="progress-wrap">
        <div class="progress-bg">
          <div class="progress-fill" id="bar-${id}" style="width:0%;background:${barColor}"></div>
        </div>
        <div class="progress-labels">
          <span id="cur-${id}">0</span>
          <span>Goal: ${goal}${unit === 'kcal' || unit === 'steps' ? '' : unit}</span>
        </div>
      </div>
    </div>`;
}

async function loadTodayHealth() {
  try {
    const res = await apiRequest("/health/today");
    todayData = { ...todayData, ...(res.data || {}) };
    updateAllBars();
    prefillInputs();
  } catch (_) {}
}

function prefillInputs() {
  ["steps","water","calories","sleep"].forEach(k => {
    const el = document.getElementById("input-" + k);
    if (el && todayData[k]) el.value = todayData[k];
  });
}

function updateAllBars() {
  const fmt = {
    steps:    v => v.toLocaleString(),
    water:    v => v.toFixed(1)+"L",
    calories: v => v+" kcal",
    sleep:    v => v+"h",
  };
  const ids = { steps:"steps", water:"water", calories:"calories", sleep:"sleep" };

  for (const [k, barId] of Object.entries(ids)) {
    const val = todayData[k] || 0;
    const pct = Math.min(100, Math.round((val / GOALS[k]) * 100));
    const bar = document.getElementById("bar-" + barId);
    const cur = document.getElementById("cur-" + barId);
    const stat = document.getElementById("stat-" + barId);
    if (bar) bar.style.width = pct + "%";
    if (cur) cur.textContent = fmt[k](val);
    if (stat) stat.textContent = fmt[k](val);
  }
}

async function logMetric(key) {
  const inputEl = document.getElementById("input-" + key);
  const val     = parseFloat(inputEl.value) || 0;

  todayData[key] = val;
  updateAllBars();

  // Persist to backend
  try {
    await apiRequest("/health/log", "POST", todayData);
  } catch (err) {
    console.warn("Could not save health data:", err.message);
  }
}
