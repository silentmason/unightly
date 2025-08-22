import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000'); // Connect to your backend

function Chat() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages(prevMessages => [...prevMessages, message]);
        });

        return () => {
            socket.off('message');
        };
    }, []);

    const sendMessage = () => {
        socket.emit('message', newMessage);
        setNewMessage('');
    };

    return (
        <div>
            <ul>
                {messages.map((message, index) => (
                    <li key={index}>{message}</li>
                ))}
            </ul>
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default Chat;