import { io } from "https://cdn.socket.io/4.7.2/socket.io.esm.min.js";
const button = document.getElementById("button");
const input = document.getElementById("input");
const messages = document.getElementById("messages");

const socket = io("http://localhost:8000");

socket.emit("join-room", "room123");

button.addEventListener("click", () => {
  const msg = input.value.trim();
  if (!msg) return;

  const div = document.createElement("div");
  div.classList.add("message", "text-right");
  div.innerText = msg;

  messages.appendChild(div);

  socket.emit("send-message", { roomId: "room123", msg });

  input.value = "";
});

socket.on("receive-message", (msg) => {
  const div = document.createElement("div");
  div.classList.add("message", "text-left");
  div.innerText = msg;

  messages.appendChild(div);
});
