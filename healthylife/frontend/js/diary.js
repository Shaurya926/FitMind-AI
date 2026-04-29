// ============================================================
// js/diary.js — Daily Diary/Journal Page
// ============================================================

let selectedMood = "🙂";

function renderDiaryPage() {
  document.getElementById("page-diary").innerHTML = `
    <h1 class="page-heading">Daily Diary</h1>
    <p class="page-sub">Track your mood, thoughts, and daily experiences.</p>

    <div class="card">
      <div class="card-title">New entry</div>
      <div style="font-size:13px;color:var(--gray-600);font-weight:500;margin-bottom:10px">How are you feeling today?</div>
      <div class="mood-row">
        <button class="mood-btn selected" onclick="pickMood(this,'😄')">😄</button>
        <button class="mood-btn" onclick="pickMood(this,'🙂')">🙂</button>
        <button class="mood-btn" onclick="pickMood(this,'😐')">😐</button>
        <button class="mood-btn" onclick="pickMood(this,'😟')">😟</button>
        <button class="mood-btn" onclick="pickMood(this,'😴')">😴</button>
      </div>
      <textarea id="diaryText" placeholder="Write about your day — how the workout felt, what you ate, your energy levels, goals, or anything on your mind..." style="margin-bottom:12px"></textarea>
      <button class="btn-primary" style="background:var(--blue)" onclick="saveDiary()">Save Entry</button>
    </div>

    <div class="card">
      <div class="card-title">Past entries</div>
      <div id="diaryList"><div class="empty-state"><div class="empty-icon">⏳</div>Loading entries...</div></div>
    </div>
  `;

  selectedMood = "😄"; // default
  loadDiaryEntries();
}

function pickMood(btn, mood) {
  selectedMood = mood;
  document.querySelectorAll(".mood-btn").forEach(b => b.classList.remove("selected"));
  btn.classList.add("selected");
}

async function saveDiary() {
  const text = document.getElementById("diaryText").value.trim();
  if (!text) { alert("Please write something first!"); return; }

  try {
    await apiRequest("/diary", "POST", { mood: selectedMood, text });
    document.getElementById("diaryText").value = "";
    loadDiaryEntries();
  } catch (err) {
    alert("Could not save entry: " + err.message);
  }
}

async function loadDiaryEntries() {
  const listEl = document.getElementById("diaryList");
  if (!listEl) return;

  try {
    const res     = await apiRequest("/diary");
    const entries = res.data;

    if (!entries || !entries.length) {
      listEl.innerHTML = `<div class="empty-state"><div class="empty-icon">📔</div>No entries yet. Start writing!</div>`;
      return;
    }

    listEl.innerHTML = entries.map(e => `
      <div class="diary-entry">
        <div class="diary-meta">
          <span class="diary-date">${formatDate(e.createdAt)}</span>
          <div style="display:flex;align-items:center;gap:10px">
            <span class="diary-mood">${e.mood}</span>
            <button class="diary-del" onclick="deleteDiary('${e._id}')">Delete</button>
          </div>
        </div>
        <div class="diary-text">${e.text.replace(/\n/g, "<br>")}</div>
      </div>`).join("");
  } catch (err) {
    listEl.innerHTML = `<div class="empty-state"><div class="empty-icon">⚠️</div>${err.message}</div>`;
  }
}

async function deleteDiary(id) {
  if (!confirm("Delete this entry?")) return;
  try {
    await apiRequest("/diary/" + id, "DELETE");
    loadDiaryEntries();
  } catch (err) {
    alert("Could not delete: " + err.message);
  }
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-IN", {
    weekday: "short", day: "numeric", month: "short", year: "numeric",
  });
}
