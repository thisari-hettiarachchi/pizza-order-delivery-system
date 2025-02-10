import React, { useState } from 'react';
import { BiSend } from 'react-icons/bi';
import './UserMessage.css';

const UserMessage = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi, I placed an order but didn’t get tracking details. Can you help?", sender: "me" },
        { id: 2, text: "Sure! Please share your order number.", sender: "other" },
        { id: 3, text: "It’s #SH123456.", sender: "me" },
        { id: 4, text: "Thanks! Your order was shipped yesterday. The tracking details were emailed. Have you checked your spam folder?", sender: "other" },
        { id: 5, text: "Oh, let me check… Yes, I found it! Thanks!", sender: "me" },
        { id: 6, text: "Glad to help! Anything else?", sender: "other" },
        { id: 7, text: "No, that’s all. Thanks!", sender: "me" },
        { id: 8, text: "You're welcome! Have a great day! 😊", sender: "other" },
    ]);

    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input.trim() === '') return;
        setMessages([...messages, { id: messages.length + 1, user: "You", time: "Now", text: input, sender: "me" }]);
        setInput('');
    };

    return (
        <div className="message-section">
            <p className="message-title">Support Team</p>
            <div className="message-list">
                {messages.map((msg) => (
                    <div key={msg.id} className={`message ${msg.sender === "me" ? "user" : "support"}`}>
                        <p className="message-user">{msg.user} <span className="message-time">{msg.time}</span></p>
                        <p>{msg.text}</p>
                    </div>
                ))}
            </div>

            <div className="message-input">
                <input type="text" placeholder="Type your message..." value={input} onChange={(e) => setInput(e.target.value)} />
                <button className="send-icon" onClick={handleSend}><BiSend /></button>
            </div>
        </div>
    );
};

export default UserMessage;
