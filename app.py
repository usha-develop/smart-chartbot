from flask import Flask, render_template, request, jsonify
from groq import Groq
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Create Groq client
client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

chat_history = []

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():

    user_message = request.json["message"]

    chat_history.append({
        "role": "user",
        "content": user_message
    })

    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=chat_history,
        temperature=0.7,
        max_tokens=1024
    )

    bot_reply = completion.choices[0].message.content

    chat_history.append({
        "role": "assistant",
        "content": bot_reply
    })

    return jsonify({
        "response": bot_reply
    })

if __name__ == "__main__":
    app.run(debug=True)