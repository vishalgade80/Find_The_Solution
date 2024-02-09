import React from "react";
import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";

import "./ChatBot.css";

const configuration = new Configuration({
  organization: " org-iKuq3Vtv6blfqg5DIbwDjpKj",
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

const ChatBot = () => {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const chat = async (e, message) => {
    e.preventDefault();
    if (!message) return;
    setIsTyping(true);

    let msgs = chats;
    msgs.push({ role: "user", content: message });
    setChats(msgs);
    setMessage("");

    await openai
      .createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are ProgrammingGPT. You help with solving programming related doubts.",
          },
          ...chats,
        ],
      })
      .then((res) => {
        msgs.push(res.data.choices[0].message);
        setChats(msgs);
        setIsTyping(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="Chatbot">
      <h1 className="h1">ask<span className="span">Solution</span></h1>

      <section>
        {chats && chats.length
          ? chats.map((chat, index) => (
              <p key={index} className={chat.role === "user" ? "user_msg" : "assistant"}>
                <span className="key">{chat.role === "user" ? "U" : "A"}</span>
                <span className="key">:</span>
                <span className="response">{chat.content}</span>
              </p>
            ))
          : ""}
      </section>

      <div className={isTyping ? "typing" : "hide"}>
        <p>
          <i>{isTyping ? "Typing" : ""}</i>
        </p>
      </div>

      <form className="doubt-form" onSubmit={(e) => chat(e, message)}>
        <input
          className="doubt"
          type="text"
          name="message"
          value={message}
          placeholder="Type a message and hit enter"
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>
    </div>
  );
};

export default ChatBot;