// ============================================================
// js/chat.js — AI Health Chat Page
// ============================================================

let chatHistory = [];

function renderChatPage() {
  document.getElementById("page-chat").innerHTML = `
    <h1 class="page-heading">AI Health Assistant</h1>
    <p class="page-sub">Ask anything about fitness, nutrition, sleep, and wellbeing.</p>

    <div class="card">
      <div class="chat-box" id="chatBox">
        <div class="msg ai">
          <div class="msg-av">AI</div>
          <div class="msg-bubble">Hi! I'm your personal health assistant 👋 Ask me anything — workout plans, diet advice, recovery tips, or how to stay motivated. I'm here to help!</div>
        </div>
      </div>
      <div class="chat-input-row">
        <input type="text" id="chatInput" placeholder="Ask me about fitness, diet, recovery..." onkeydown="if(event.key==='Enter')sendMessage()">
        <button class="btn-primary" id="chatSendBtn" style="width:auto;padding:10px 20px" onclick="sendMessage()">Send</button>
      </div>
    </div>

    <div class="card">
      <div class="section-label">Quick questions</div>
      <div class="quick-prompts">
        <button class="btn-secondary quick-btn" onclick="quickAsk('How can I improve my sleep quality?')">😴 Sleep tips</button>
        <button class="btn-secondary quick-btn" onclick="quickAsk('What should I eat before a workout?')">🥗 Pre-workout diet</button>
        <button class="btn-secondary quick-btn" onclick="quickAsk('How to recover faster after a workout?')">💪 Recovery tips</button>
        <button class="btn-secondary quick-btn" onclick="quickAsk('What are the best exercises for weight loss?')">🔥 Weight loss</button>
        <button class="btn-secondary quick-btn" onclick="quickAsk('How much water should I drink per day?')">💧 Hydration</button>
        <button class="btn-secondary quick-btn" onclick="quickAsk('How can I reduce stress and anxiety naturally?')">🧘 Stress relief</button>
        <button class="btn-secondary quick-btn" onclick="quickAsk('How do I build muscle if I am a beginner?')">🏋️ Beginner muscle</button>
        <button class="btn-secondary quick-btn" onclick="quickAsk('What is a healthy daily meal plan for fitness?')">🍽️ Meal plan</button>
      </div>
    </div>
  `;
}

function quickAsk(q) {
  navigate("chat");
  document.getElementById("chatInput").value = q;
  setTimeout(sendMessage, 100);
}

async function sendMessage() {
  const inputEl = document.getElementById("chatInput");
  const msg     = inputEl.value.trim();
  if (!msg) return;
  inputEl.value = "";

  appendMessage("user", msg);
  chatHistory.push({ role: "user", content: msg });

  const sendBtn = document.getElementById("chatSendBtn");
  sendBtn.disabled = true;

  // Typing indicator
  const typingEl = document.createElement("div");
  typingEl.className = "msg ai";
  typingEl.id = "typing";
  typingEl.innerHTML = `<div class="msg-av">AI</div><div class="typing-dots"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>`;
  document.getElementById("chatBox").appendChild(typingEl);
  scrollChat();

  try {
    const res = await apiRequest("/ai/chat", "POST", {
      message: msg,
      history: chatHistory.slice(-10), // send last 10 messages for context
    });
    const reply = res.data.reply;
    chatHistory.push({ role: "assistant", content: reply });
    document.getElementById("typing")?.remove();
    appendMessage("ai", reply);
  } catch (err) {
    document.getElementById("typing")?.remove();
    appendMessage("ai", "Sorry, I couldn't connect to the AI right now. Please try again.");
  } finally {
    sendBtn.disabled = false;
  }
}

function appendMessage(role, text) {
  const box  = document.getElementById("chatBox");
  const div  = document.createElement("div");
  div.className = "msg " + role;
  div.innerHTML = `
    <div class="msg-av">${role === "ai" ? "AI" : "You"}</div>
    <div class="msg-bubble">${text.replace(/\n/g, "<br>")}</div>`;
  box.appendChild(div);
  scrollChat();
}

function scrollChat() {
  const box = document.getElementById("chatBox");
  if (box) box.scrollTop = box.scrollHeight;
}
