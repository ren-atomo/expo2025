const GAS_URL = "あなたのGASデプロイURL";

// チャット読み込み
async function loadChat() {
  const res = await fetch(GAS_URL + "?type=chat");
  const messages = await res.json();
  const log = document.getElementById("chat-log");
  log.innerHTML = "";
  messages.forEach(m => {
    const p = document.createElement("p");
    p.textContent = `[${m.Timestamp}] ${m.user_id}: ${m.message}`;
    log.appendChild(p);
  });
  log.scrollTop = log.scrollHeight;
}

// チャット送信
async function sendMessage() {
  const user = document.getElementById("chat-user").value;
  const msg = document.getElementById("chat-message").value;
  if (!user || !msg) return alert("名前とメッセージを入力してください");

  await fetch(GAS_URL, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      type: "chat",
      user_id: user,
      message: msg
    })
  });
  document.getElementById("chat-message").value = "";
  loadChat();
}
