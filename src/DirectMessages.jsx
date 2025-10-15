import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { enqueueMessage, dequeueMessage } from "./MessagesSlice";
import { pushNotification } from "./NotificationsSlice";

const DirectMessages = () => {
  const [newMessage, setNewMessage] = useState("");
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages.list);

  const handleEnqueue = () => {
    if (!newMessage.trim()) return;
    dispatch(enqueueMessage({ text: newMessage, timestamp: Date.now() }));
    setNewMessage("");
  };

  const handleProcessNext = () => {
    const next = messages[0];
    if (!next) {
      alert("No hay mensajes pendientes.");
      return;
    }
    dispatch(dequeueMessage());
    dispatch(
      pushNotification({
        title: "Mensaje enviado",
        body: next.text,
        timestamp: Date.now(),
      })
    );
  };

  return (
    <div style={{ padding: 12 }}>
      <h2>Cola de mensajes directos</h2>
      <div>
        <input
          placeholder="Nuevo mensaje..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleEnqueue}>Agregar a cola</button>
        <button onClick={handleProcessNext}>Enviar siguiente</button>
      </div>
      <h3>Mensajes pendientes</h3>
      <ol>
        {messages.map((m, i) => (
          <li key={i}>
            {m.text} <small>({new Date(m.timestamp).toLocaleString()})</small>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default DirectMessages;
