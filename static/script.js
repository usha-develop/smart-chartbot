async function sendMessage() {

    let inputField = document.getElementById("user-input");

    let message = inputField.value.trim();

    if(message === ""){
        return;
    }

    let chatBox = document.getElementById("chat-box");

    // User message

    let userDiv = document.createElement("div");

    userDiv.className = "user-message";

    userDiv.innerText = message;

    chatBox.appendChild(userDiv);

    inputField.value = "";

    // Typing animation

    let typingDiv = document.createElement("div");

    typingDiv.className = "bot-message";

    typingDiv.innerText = "Typing...";

    chatBox.appendChild(typingDiv);

    chatBox.scrollTop = chatBox.scrollHeight;

    // Send request

    let response = await fetch("/chat", {

        method: "POST",

        headers: {
            "Content-Type":"application/json"
        },

        body: JSON.stringify({
            message: message
        })

    });

    let data = await response.json();

    // Remove typing

    chatBox.removeChild(typingDiv);

    // Bot response

    let botDiv = document.createElement("div");

    botDiv.className = "bot-message";

    botDiv.innerText = data.response;

    chatBox.appendChild(botDiv);

    chatBox.scrollTop = chatBox.scrollHeight;
}

// Enter key support

document.getElementById("user-input")
.addEventListener("keypress", function(event){

    if(event.key === "Enter"){
        sendMessage();
    }

});