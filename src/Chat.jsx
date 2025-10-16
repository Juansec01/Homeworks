import React from "react";
import useChat from "./useChat";
import { useSelector } from "react-redux";

export default function Chat() {
  const {
    messages,
    newMessage,
    setNewMessage,
    sendMessage,
    handleKeyPress,
    isSending,
    error,
    messagesEndRef,
    formatTime
  } = useChat();

  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return (
      <div style={{ 
        padding: "20px", 
        textAlign: "center",
        backgroundColor: "#f8f9fa",
        borderRadius: "10px",
        margin: "20px"
      }}>
        <h3>💬 Chat Personal</h3>
        <p>Inicia sesión para usar el chat</p>
      </div>
    );
  }

  return (
    <div style={{ 
      maxWidth: "800px", 
      margin: "0 auto", 
      padding: "20px",
      fontFamily: "Arial, sans-serif"
    }}>
      {/* Header del Chat */}
      <div style={{ 
        backgroundColor: "#007bff", 
        color: "white", 
        padding: "15px", 
        borderRadius: "10px 10px 0 0",
        textAlign: "center"
      }}>
        <h3 style={{ margin: 0 }}> Chat Personal</h3>
        <p style={{ margin: "5px 0 0 0", fontSize: "0.9em", opacity: 0.9 }}>
          Escribe mensajes a ti mismo - Tiempo Real
        </p>
      </div>

      {/* Área de Mensajes */}
      <div style={{ 
        height: "400px", 
        overflowY: "auto", 
        padding: "15px",
        backgroundColor: "#f8f9fa",
        border: "1px solid #dee2e6",
        borderTop: "none"
      }}>
        {messages.length === 0 ? (
          <div style={{ 
            textAlign: "center", 
            color: "#6c757d", 
            padding: "40px" 
          }}>
            <p>🤔 No hay mensajes todavía</p>
            <p>¡Envía tu primer mensaje!</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              style={{
                marginBottom: "15px",
                display: "flex",
                justifyContent: "flex-start"
              }}
            >
              <div style={{
                backgroundColor: "#007bff",
                color: "white",
                padding: "10px 15px",
                borderRadius: "18px",
                maxWidth: "70%",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
              }}>
                <div style={{ fontSize: "14px" }}>
                  {message.text}
                </div>
                <div style={{ 
                  fontSize: "11px", 
                  opacity: 0.8, 
                  textAlign: "right",
                  marginTop: "5px"
                }}>
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Mostrar Errores */}
      {error && (
        <div style={{ 
          color: "#dc3545", 
          backgroundColor: "#f8d7da", 
          padding: "10px", 
          borderRadius: "5px",
          margin: "10px 0",
          border: "1px solid #f5c6cb"
        }}>
          {error}
        </div>
      )}

      {/* Formulario de Envío */}
      <form onSubmit={sendMessage} style={{ 
        display: "flex", 
        gap: "10px", 
        marginTop: "15px" 
      }}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Escribe tu mensaje..."
          disabled={isSending}
          style={{
            flex: 1,
            padding: "12px 15px",
            border: "1px solid #ced4da",
            borderRadius: "25px",
            fontSize: "16px",
            outline: "none",
            transition: "border-color 0.3s"
          }}
          onFocus={(e) => e.target.style.borderColor = "#007bff"}
          onBlur={(e) => e.target.style.borderColor = "#ced4da"}
        />
        <button
          type="submit"
          disabled={isSending || !newMessage.trim()}
          style={{
            padding: "12px 25px",
            backgroundColor: isSending ? "#6c757d" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "25px",
            cursor: isSending ? "not-allowed" : "pointer",
            fontSize: "16px",
            fontWeight: "bold",
            transition: "background-color 0.3s"
          }}
        >
          {isSending ? "⏳" : "📤"}
        </button>
      </form>

      {/* Información del usuario */}
      <div style={{ 
        marginTop: "15px", 
        textAlign: "center", 
        fontSize: "12px", 
        color: "#6c757d" 
      }}>
        Conectado como: <strong>{user.email}</strong> | 
        Mensajes: <strong>{messages.length}</strong>
      </div>
    </div>
  );
}