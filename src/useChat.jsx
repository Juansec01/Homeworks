import { useState, useEffect, useRef } from "react";
import { realtimeDb } from "./firebase/config";
import { ref, push, onValue, off, serverTimestamp } from "firebase/database";
import { useSelector } from "react-redux";

export default function useChat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);
  
  const user = useSelector((state) => state.auth.user);
  const messagesEndRef = useRef(null);

  // ✅ Desplazarse al último mensaje automáticamente
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // ✅ Escuchar mensajes en tiempo real
  useEffect(() => {
    if (!user) {
      setMessages([]);
      return;
    }

    const messagesRef = ref(realtimeDb, `chats/${user.uid}`);
    
    const handleData = (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convertir objeto a array y ordenar por timestamp
        const messagesArray = Object.entries(data).map(([id, message]) => ({
          id,
          ...message
        })).sort((a, b) => a.timestamp - b.timestamp);
        
        setMessages(messagesArray);
      } else {
        setMessages([]);
      }
    };

    // Suscribirse a cambios en tiempo real
    onValue(messagesRef, handleData);

    // Cleanup al desmontar
    return () => {
      off(messagesRef, 'value', handleData);
    };
  }, [user]);

  // ✅ Enviar nuevo mensaje
  const sendMessage = async (e) => {
    e?.preventDefault();
    
    if (!newMessage.trim() || !user) return;

    setIsSending(true);
    setError(null);

    try {
      const messagesRef = ref(realtimeDb, `chats/${user.uid}`);
      
      await push(messagesRef, {
        text: newMessage.trim(),
        timestamp: serverTimestamp(),
        sender: user.uid,
        senderEmail: user.email
      });

      setNewMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
      setError("Error al enviar el mensaje: " + err.message);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    
    const date = new Date(timestamp);
    return date.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return {
    messages,
    newMessage,
    setNewMessage,
    sendMessage,
    handleKeyPress,
    isSending,
    error,
    messagesEndRef,
    formatTime
  };
}