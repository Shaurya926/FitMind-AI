// ============================================================
// js/plan.js — Weekly AI Training Plan Page
// ============================================================

function renderPlanPage() {
  document.getElementById("page-plan").innerHTML = `
    <h1 class="page-heading">Weekly Training Plan</h1>
    <p class="page-sub">Enter your body metrics and let AI build a personalised 7-day plan.</p>

    <div class="card">
      <div class="section-label">Your body metrics</div>
      <div class="form-grid">
        <div class="form-group">
          <label>Age (years)</label>
          <input type="number" id="p-age" placeholder="25" min="10" max="90">
        </div>
        <div class="form-group">
          <label>Weight (kg)</label>
          <input type="number" id="p-weight" placeholder="70" min="30" max="200">
        </div>
        <div class="form-group">
          <label>Height (cm)</label>
          <input type="number" id="p-height" placeholder="170" min="100" max="250">
        </div>
        <div class="form-group">
          <label>Gender</label>
          <select id="p-gender">
            <option value="">Select...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other / Prefer not to say</option>
          </select>
        </div>
        <div class="form-group full">
          <label>Primary fitness goal</label>
          <select id="p-goal">
            <option value="">Select your goal...</option>
            <option value="weight loss">Weight loss & fat burn</option>
            <option value="muscle building">Muscle building & strength</option>
            <option value="general fitness">General fitness & maintenance</option>
            <option value="endurance">Endurance & cardio improvement</option>
            <option value="flexibility">Flexibility & mobility</option>
          </select>
        </div>
        <div class="form-group full">
          <label>Current activity level</label>
          <select id="p-activity">
            <option value="">Select...</option>
            <option value="sedentary">Sedentary (mostly desk work)</option>
            <option value="lightly active">Lightly active (1-2x/week)</option>
            <option value="moderately active">Moderately active (3-4x/week)</option>
            <option value="very active">Very active (5-6x/week)</option>
            <option value="athlete">Athlete (intense daily training)</option>
          </select>
        </div>
        <div class="form-group full">
          <label>Health conditions or injuries <span style="font-weight:400;color:var(--gray-600)">(optional)</span></label>
          <textarea id="p-conditions" placeholder="e.g. knee pain, lower back issues, asthma, diabetes..."></textarea>
        </div>
      </div>
      <button class="btn-primary" id="planGenBtn" onclick="generateTrainingPlan()">
        <span id="planBtnText">✨ Generate My Week Plan</span>
        <div class="spinner" id="planSpinner"></div>
      </button>
    </div>

    <div id="planResult"></div>
  `;
}

async function generateTrainingPlan() {
  const age         = document.getElementById("p-age").value;
  const weight      = document.getElementById("p-weight").value;
  const height      = document.getElementById("p-height").value;
  const gender      = document.getElementById("p-gender").value;
  const goal        = document.getElementById("p-goal").value;
  const activityLevel = document.getElementById("p-activity").value;
  const conditions  = document.getElementById("p-conditions").value;

  if (!age || !weight || !height || !goal || !activityLevel) {
    alert("Please fill in all required fields."); return;
  }

  const btn    = document.getElementById("planGenBtn");
  const spin   = document.getElementById("planSpinner");
  const btnTxt = document.getElementById("planBtnText");
  btn.disabled = true;
  spin.style.display = "block";
  btnTxt.style.display = "none";

  try {
    const res = await apiRequest("/ai/plan", "POST", {
      age, weight, height, gender, goal, activityLevel, conditions,
    });
    displayPlan(res.data);
  } catch (err) {
    document.getElementById("planResult").innerHTML =
      `<div class="card" style="border-color:#F7C1C1"><p style="color:var(--coral);font-size:13px">⚠️ ${err.message}</p></div>`;
  } finally {
    btn.disabled = false;
    spin.style.display = "none";
    btnTxt.style.display = "inline";
  }
}

function displayPlan(plan) {
  const dayAbbr = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const focusIcon = f => {
    if (!f) return "💪";
    const m = { Chest:"🏋️", Back:"🚣", Legs:"🦵", Arms:"💪", Cardio:"🏃", Core:"🧘",
                Yoga:"🧘", Rest:"😴", Flexibility:"🤸", Shoulders:"🏋️", HIIT:"⚡", "Full Body":"🤸" };
    for (const k in m) if (f.includes(k)) return m[k];
    return "💪";
  };

  const bmiColor = parseFloat(plan.bmi) < 18.5 ? "var(--blue)"
    : parseFloat(plan.bmi) < 25 ? "var(--green)"
    : parseFloat(plan.bmi) < 30 ? "var(--amber)"
    : "var(--coral)";

  const weekChips = plan.days.map((d, i) => `
    <div class="day-chip ${d.type}">
      <div class="day-chip-abbr">${dayAbbr[i] || d.day.slice(0,3)}</div>
      <div class="day-chip-icon">${focusIcon(d.focus)}</div>
      <div class="day-chip-focus">${d.focus || "Rest"}</div>
    </div>`).join("");

  const dayDetails = plan.days.map(d => `
    <div class="day-detail-item">
      <div class="day-detail-header">
        <span class="day-detail-name">${d.day}</span>
        <span class="badge ${d.type === "rest" ? "badge-rest" : "badge-active"}">
          ${d.type === "rest" ? "😴 Rest day" : `${d.intensity} · ${d.duration}`}
        </span>
      </div>
      <div class="day-detail-desc">${d.exercises}</div>
    </div>`).join("");

  document.getElementById("planResult").innerHTML = `
    <div class="card">
      <div class="section-label">Your metrics</div>
      <div class="metrics-row">
        <div class="metric-card">
          <div class="metric-value" style="color:${bmiColor}">${plan.bmi}</div>
          <div class="metric-label">BMI · ${plan.bmiCategory}</div>
        </div>
        <div class="metric-card">
          <div class="metric-value" style="color:var(--coral)">${plan.dailyCalories}</div>
          <div class="metric-label">Daily calories (kcal)</div>
        </div>
        <div class="metric-card">
          <div class="metric-value" style="color:var(--purple)">${plan.proteinGoal}g</div>
          <div class="metric-label">Protein goal/day</div>
        </div>
      </div>
      <p style="font-size:13px;color:var(--gray-600);line-height:1.6">${plan.summary}</p>
    </div>

    <div class="card">
      <div class="section-label">Weekly overview</div>
      <div class="week-grid">${weekChips}</div>
      <div style="margin-top:20px">
        <div class="card-title">Daily breakdown</div>
        ${dayDetails}
      </div>
    </div>

    ${plan.tips && plan.tips.length ? `
    <div class="card">
      <div class="card-title">Personalised tips for you</div>
      <ul class="tips-list">${plan.tips.map(t => `<li>${t}</li>`).join("")}</ul>
    </div>` : ""}
  `;
}
