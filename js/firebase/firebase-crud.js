import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js';
import { getDatabase, ref, set, push, onValue } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";
 
const firebaseConfig = {
    databaseURL: "https://chat-lnd-5105e-default-rtdb.europe-west1.firebasedatabase.app/",
    // Para hacerlo asi, tuve que poner que la DB con las reglas de seguridad de Firebase para que cualquiera pueda escribir y leer. No es una practica segura, pero mientras no se aplique en producion no importa mucho la verdad (o eso creo y espero :)
};
 
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


function listenToNewMessages() {
  const messagesRef = ref(db, "messages/");
  onValue(messagesRef, (snapshot) => {
    showMessages(snapshot);
  });
}


function showMessages(snapshot) {
  const data = snapshot.val();
  let messageList = "";

  if (data) {
    for (let item in data) {
      messageList = `
        <div>
          <div><strong>${data[item].sentBy}:</strong></div>
          <div>${data[item].message}</div>
        </div>
      ` + messageList;
    }
  }

  const messageListElement = document.getElementById("message-list");
  if (messageListElement) {
    messageListElement.innerHTML = messageList;
  }
}


function sendMessage(event) {
  event.preventDefault();
  const formSendMessage = event.target;

  const messagesRef = ref(db, "messages/");
  const newMessageRef = push(messagesRef);
  set(newMessageRef, {
    message: formSendMessage.message.value,
    sentBy: formSendMessage["sent-by"].value
  });

  formSendMessage.reset();
}


function listenToSentMessageButton() {
  const form = document.getElementById("form-send-message");
  if (form) {
    form.addEventListener("submit", sendMessage);
  }
}


const chatButton = document.getElementsByClassName("chat-button")[0];
if (chatButton) {
  chatButton.addEventListener("click", () => {
    const chatWindow = document.getElementById("chatWindow");
    if (chatWindow) {
      chatWindow.style.display = chatWindow.style.display === "flex" ? "none" : "flex";
    }
  });
}

// Inicializar escuchas
listenToNewMessages();
listenToSentMessageButton();
