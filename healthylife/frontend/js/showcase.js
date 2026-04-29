// ============================================================
// js/showcase.js — Project Showcase Page
// ============================================================

function renderShowcasePage() {
  document.getElementById("page-showcase").innerHTML = `
    <div class="showcase-wrap">

      <div class="showcase-hero">
        <h1 class="showcase-title">Healthy<span>Life</span> AI</h1>
        <p class="showcase-sub">AI-powered personal health companion · Full-stack web app</p>
        <div class="showcase-badges">
          <span class="sc-badge">Node.js</span>
          <span class="sc-badge">Express</span>
          <span class="sc-badge">MongoDB</span>
          <span class="sc-badge">Claude AI</span>
          <span class="sc-badge">JWT Auth</span>
        </div>
      </div>

      <div class="sc-section-label">Live stats</div>
      <div class="sc-stat-grid">
        <div class="sc-stat"><div class="sc-num" id="sc-c1">0</div><div class="sc-lbl">API endpoints</div></div>
        <div class="sc-stat"><div class="sc-num" id="sc-c2">0</div><div class="sc-lbl">Features</div></div>
        <div class="sc-stat"><div class="sc-num" id="sc-c3">0</div><div class="sc-lbl">DB models</div></div>
        <div class="sc-stat"><div class="sc-num" id="sc-c4">0</div><div class="sc-lbl">AI-powered routes</div></div>
      </div>

      <div class="sc-section-label">Health metrics preview</div>
      <div class="sc-charts-row">
        <div class="sc-chart-card">
          <div class="sc-chart-title">Weekly steps (000s)</div>
          <div style="position:relative;height:160px">
            <canvas id="sc-stepsChart" role="img" aria-label="Bar chart of weekly steps"></canvas>
          </div>
        </div>
        <div class="sc-chart-card">
          <div class="sc-chart-title">30-day health score</div>
          <div style="position:relative;height:160px">
            <canvas id="sc-scoreChart" role="img" aria-label="Line chart of health score trend"></canvas>
          </div>
        </div>
      </div>
      <div class="sc-charts-row">
        <div class="sc-chart-card">
          <div class="sc-chart-title">Goal distribution</div>
          <div style="position:relative;height:160px">
            <canvas id="sc-goalChart" role="img" aria-label="Doughnut chart of goal types"></canvas>
          </div>
        </div>
        <div class="sc-chart-card">
          <div class="sc-chart-title">Daily tracker progress</div>
          <div style="padding-top:4px">
            <div class="sc-bar-row"><span>Steps</span><span>8,200 / 10,000</span></div>
            <div class="sc-bar-track"><div class="sc-bar-fill" id="sc-b1" style="background:#1D9E75"></div></div>
            <div class="sc-bar-row"><span>Water</span><span>1.8 / 2.5 L</span></div>
            <div class="sc-bar-track"><div class="sc-bar-fill" id="sc-b2" style="background:#378ADD"></div></div>
            <div class="sc-bar-row"><span>Calories</span><span>420 / 600</span></div>
            <div class="sc-bar-track"><div class="sc-bar-fill" id="sc-b3" style="background:#EF9F27"></div></div>
            <div class="sc-bar-row"><span>Sleep</span><span>7.2 / 8 hrs</span></div>
            <div class="sc-bar-track"><div class="sc-bar-fill" id="sc-b4" style="background:#7F77DD"></div></div>
          </div>
        </div>
      </div>

      <div class="sc-section-label">Core features</div>
      <div class="sc-feat-grid">
        <div class="sc-feat"><div class="sc-feat-dot" style="background:#1D9E75"></div><div><div class="sc-feat-name">AI training plan</div><div class="sc-feat-desc">Claude generates a personalised 7-day workout plan from your metrics</div></div></div>
        <div class="sc-feat"><div class="sc-feat-dot" style="background:#378ADD"></div><div><div class="sc-feat-name">Daily tracker</div><div class="sc-feat-desc">Log steps, water, calories & sleep with live progress bars</div></div></div>
        <div class="sc-feat"><div class="sc-feat-dot" style="background:#D4537E"></div><div><div class="sc-feat-name">AI chat</div><div class="sc-feat-desc">Multi-turn health coach with conversation memory</div></div></div>
        <div class="sc-feat"><div class="sc-feat-dot" style="background:#EF9F27"></div><div><div class="sc-feat-name">Diary</div><div class="sc-feat-desc">Mood-tagged journal with timestamps</div></div></div>
        <div class="sc-feat"><div class="sc-feat-dot" style="background:#7F77DD"></div><div><div class="sc-feat-name">Dashboard</div><div class="sc-feat-desc">Today's health summary at a glance</div></div></div>
      </div>

      <div class="sc-section-label">Request flow</div>
      <div class="sc-flow">
        <div class="sc-flow-box" style="background:#E1F5EE;color:#085041">Browser</div>
        <div class="sc-flow-arr">→</div>
        <div class="sc-flow-box">Express :5000</div>
        <div class="sc-flow-arr">→</div>
        <div class="sc-flow-box">JWT Auth</div>
        <div class="sc-flow-arr">→</div>
        <div class="sc-flow-box">Route handler</div>
        <div class="sc-flow-arr">→</div>
        <div class="sc-flow-box" style="background:#E6F1FB;color:#0C447C">MongoDB</div>
        <div class="sc-flow-arr">→</div>
        <div class="sc-flow-box" style="background:#EEEDFE;color:#3C3489">Claude API</div>
      </div>

      <div class="sc-section-label">Tech stack</div>
      <div class="sc-stack">
        <div class="sc-pill"><span class="sc-dot" style="background:#1D9E75"></span>Node.js + Express</div>
        <div class="sc-pill"><span class="sc-dot" style="background:#378ADD"></span>MongoDB + Mongoose</div>
        <div class="sc-pill"><span class="sc-dot" style="background:#7F77DD"></span>Claude AI (Anthropic)</div>
        <div class="sc-pill"><span class="sc-dot" style="background:#EF9F27"></span>JWT + bcrypt</div>
        <div class="sc-pill"><span class="sc-dot" style="background:#D4537E"></span>Vanilla JS frontend</div>
        <div class="sc-pill"><span class="sc-dot" style="background:#888780"></span>14 REST endpoints</div>
      </div>

      <div class="sc-section-label">API endpoints</div>
      <div class="sc-ep-list">
        <div class="sc-ep"><span class="sc-method sc-post">POST</span><span class="sc-path">/api/users/register</span><span class="sc-ep-desc">Create account</span></div>
        <div class="sc-ep"><span class="sc-method sc-post">POST</span><span class="sc-path">/api/users/login</span><span class="sc-ep-desc">Login → JWT</span></div>
        <div class="sc-ep"><span class="sc-method sc-get">GET</span><span class="sc-path">/api/health/history</span><span class="sc-ep-desc">Last 30 days</span></div>
        <div class="sc-ep"><span class="sc-method sc-post">POST</span><span class="sc-path">/api/health/log</span><span class="sc-ep-desc">Log today's data</span></div>
        <div class="sc-ep"><span class="sc-method sc-post">POST</span><span class="sc-path">/api/ai/plan</span><span class="sc-ep-desc">Generate AI training plan</span></div>
        <div class="sc-ep"><span class="sc-method sc-post">POST</span><span class="sc-path">/api/ai/chat</span><span class="sc-ep-desc">Multi-turn AI chat</span></div>
        <div class="sc-ep"><span class="sc-method sc-post">POST</span><span class="sc-path">/api/diary</span><span class="sc-ep-desc">Create diary entry</span></div>
        <div class="sc-ep"><span class="sc-method sc-del">DEL</span><span class="sc-path">/api/diary/:id</span><span class="sc-ep-desc">Delete entry</span></div>
      </div>

    </div>
  `;

  initShowcaseCharts();
  animateShowcaseCounters();
  animateShowcaseBars();
}

function animateShowcaseCounters() {
  const targets = { 'sc-c1': 14, 'sc-c2': 5, 'sc-c3': 4, 'sc-c4': 3 };
  Object.entries(targets).forEach(([id, target]) => {
    let v = 0;
    const el = document.getElementById(id);
    if (!el) return;
    const step = target / 40;
    const t = setInterval(() => {
      v = Math.min(v + step, target);
      el.textContent = Math.round(v);
      if (v >= target) clearInterval(t);
    }, 20);
  });
}

function animateShowcaseBars() {
  setTimeout(() => {
    const bars = { 'sc-b1': '82%', 'sc-b2': '72%', 'sc-b3': '70%', 'sc-b4': '90%' };
    Object.entries(bars).forEach(([id, w]) => {
      const el = document.getElementById(id);
      if (el) el.style.width = w;
    });
  }, 300);
}

function initShowcaseCharts() {
  if (typeof Chart === 'undefined') {
    const s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js';
    s.onload = drawShowcaseCharts;
    document.head.appendChild(s);
  } else {
    drawShowcaseCharts();
  }
}

function drawShowcaseCharts() {
  const tc = '#888780';

  new Chart(document.getElementById('sc-stepsChart'), {
    type: 'bar',
    data: {
      labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
      datasets: [{ data: [7.2,8.5,6.1,9.3,7.8,11.2,5.4], backgroundColor: ['#9FE1CB','#5DCAA5','#9FE1CB','#1D9E75','#5DCAA5','#1D9E75','#9FE1CB'], borderRadius: 4, borderSkipped: false }]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false }, ticks: { font: { size: 11 }, color: tc } }, y: { grid: { color: 'rgba(136,135,128,0.1)' }, ticks: { font: { size: 10 }, color: tc } } } }
  });

  const scores = Array.from({length:30},(_,i)=>Math.round(58+i*0.9+Math.sin(i*0.7)*5));
  new Chart(document.getElementById('sc-scoreChart'), {
    type: 'line',
    data: { labels: Array.from({length:30},(_,i)=>i+1), datasets: [{ data: scores, borderColor: '#378ADD', backgroundColor: 'rgba(55,138,221,0.08)', fill: true, tension: 0.4, pointRadius: 0, borderWidth: 2 }] },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false }, ticks: { maxTicksLimit: 6, font: { size: 10 }, color: tc } }, y: { min: 50, max: 100, grid: { color: 'rgba(136,135,128,0.1)' }, ticks: { font: { size: 10 }, color: tc } } } }
  });

  new Chart(document.getElementById('sc-goalChart'), {
    type: 'doughnut',
    data: { labels: ['Weight loss 40%','Muscle gain 30%','Endurance 20%','Wellness 10%'], datasets: [{ data: [40,30,20,10], backgroundColor: ['#1D9E75','#378ADD','#7F77DD','#EF9F27'], borderWidth: 0 }] },
    options: { responsive: true, maintainAspectRatio: false, cutout: '65%', plugins: { legend: { display: true, position: 'right', labels: { font: { size: 10 }, color: tc, boxWidth: 10, padding: 8 } } } }
  });
}
