async function sendMessage() {
  const input = document.getElementById("input");
  const chat = document.getElementById("chat");

  const message = input.value;

  chat.innerHTML += `<p><b>You:</b> ${message}</p>`;

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message })
  });

  const data = await res.json();

  chat.innerHTML += `<p><b>Bot:</b> ${data.reply}</p>`;

  input.value = "";
}