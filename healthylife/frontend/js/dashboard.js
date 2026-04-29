// ============================================================
// js/dashboard.js — Dashboard Page Render
// ============================================================

async function renderDashboard() {
  const container = document.getElementById("page-dashboard");

  // Skeleton while loading
  container.innerHTML = `
    <h1 class="page-heading">Good ${getGreeting()}, ${(localStorage.getItem("userName") || "there").split(" ")[0]}! 👋</h1>
    <p class="page-sub">Here's your health snapshot for today.</p>
    <div id="dashContent"><div class="empty-state"><div class="empty-icon">⏳</div>Loading your data...</div></div>
  `;

  // Fetch today's health data and latest plan in parallel
  let health = {}, plan = null;
  try {
    const [hRes, pRes] = await Promise.allSettled([
      apiRequest("/health/today"),
      apiRequest("/ai/plan/latest"),
    ]);
    if (hRes.status === "fulfilled") health = hRes.value.data || {};
    if (pRes.status === "fulfilled") plan   = pRes.value.data;
  } catch (_) {}

  const goals = { steps: 10000, water: 2.5, calories: 500, sleep: 8 };
  const pct   = (v, g) => Math.min(100, Math.round(((v || 0) / g) * 100));

  document.getElementById("dashContent").innerHTML = `
    <div class="metrics-row">
      <div class="metric-card">
        <div class="metric-value" style="color:var(--green)">${(health.steps || 0).toLocaleString()}</div>
        <div class="metric-label">Steps today</div>
      </div>
      <div class="metric-card">
        <div class="metric-value" style="color:var(--blue)">${(health.water || 0).toFixed(1)}L</div>
        <div class="metric-label">Water intake</div>
      </div>
      <div class="metric-card">
        <div class="metric-value" style="color:var(--coral)">${health.sleep || 0}h</div>
        <div class="metric-label">Sleep last night</div>
      </div>
    </div>

    <div class="dash-grid">
      <div class="card">
        <div class="card-title">Today's progress</div>
        ${renderProgressBar("Steps",    health.steps    || 0, goals.steps,    "var(--green)",  v => v.toLocaleString(), "steps")}
        ${renderProgressBar("Water",    health.water    || 0, goals.water,    "var(--blue)",   v => v.toFixed(1)+"L",   "L")}
        ${renderProgressBar("Calories", health.calories || 0, goals.calories, "var(--coral)",  v => v+" kcal",          "kcal")}
        ${renderProgressBar("Sleep",    health.sleep    || 0, goals.sleep,    "var(--purple)", v => v+"h",              "h")}
      </div>

      <div class="card">
        <div class="card-title">Current plan</div>
        ${plan ? `
          <p style="font-size:13px;color:var(--gray-600);margin-bottom:12px">${plan.summary}</p>
          <div style="display:flex;gap:10px;flex-wrap:wrap">
            <span class="badge badge-active">Goal: ${plan.goal}</span>
            <span class="badge badge-rest">BMI: ${plan.bmi} (${plan.bmiCategory})</span>
          </div>
          <div style="margin-top:14px;font-size:13px;color:var(--gray-600)">
            🔥 ${plan.dailyCalories} kcal/day &nbsp;|&nbsp; 💪 ${plan.proteinGoal}g protein &nbsp;|&nbsp; 💧 ${plan.waterGoal}L water
          </div>
        ` : `<div class="empty-state" style="padding:20px"><div class="empty-icon">🏋️</div><p>No plan yet.<br/><a style="color:var(--green);cursor:pointer" onclick="navigate('plan')">Generate your weekly plan →</a></p></div>`}
      </div>
    </div>

    ${plan && plan.tips ? `
    <div class="card">
      <div class="card-title">Your personalized tips</div>
      <ul class="tips-list">
        ${plan.tips.map(t => `<li>${t}</li>`).join("")}
      </ul>
    </div>` : ""}
  `;
}

function renderProgressBar(label, val, goal, color, fmt, unit) {
  const pct = Math.min(100, Math.round((val / goal) * 100));
  return `
    <div style="margin-bottom:14px">
      <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:5px">
        <span style="font-weight:500">${label}</span>
        <span style="color:var(--gray-600)">${fmt(val)} / ${fmt(goal)}</span>
      </div>
      <div class="progress-bg">
        <div class="progress-fill" style="width:${pct}%;background:${color}"></div>
      </div>
    </div>`;
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "morning";
  if (h < 17) return "afternoon";
  return "evening";
}
