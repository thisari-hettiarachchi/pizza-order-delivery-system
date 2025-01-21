import React, {useState} from 'react';
import './UserMessage.css';
import { BiSend } from 'react-icons/bi';

const UserMessage = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState ('');
    const handleSend = () => {
        if (input.trim() === '') return;

        setMessages([...messages, {sender: 'user', text: input }]);

        setTimeout(() => {
            setMessages((prevMessages) => [
                ...prevMessages, 
                {sender: 'support', text: 'Thank you for your message! How can we assist you?'},
            ]);
        }, 1000);

        setInput('');
    };

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    return (
        <div className="message-section">
            <p className="message-title">Messages</p>
            <div className="message-list">
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.sender === 'user' ? 'user-message' : 'support-message'}`}>
                        {message.text}
                    </div>
                ))}
            </div>
            <div className="message-input">
                <input type="text" placeholder="Type your message..." value={input} onChange={handleInputChange}></input>
                <button className="send-icon" onClick={{handleSend}}><BiSend />Send</button>
            </div>
        </div>
    )
}

export default UserMessage