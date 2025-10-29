import React from "react";

const Faqs = () => {
  const faqs = [
    { q: "¿Cómo cambio mi contraseña?", a: "Dirígete al menú Configuración → Contraseña y sigue las instrucciones." },
    { q: "¿Cómo puedo contactar soporte?", a: "En la sección de Tickets puedes crear uno nuevo para recibir ayuda." },
    { q: "¿Dónde veo el estado de mis solicitudes?", a: "Puedes revisarlas en la pestaña Estado dentro del área de Ayuda." },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-600">❓ Preguntas Frecuentes</h1>
      {faqs.map((item, index) => (
        <div key={index} className="mb-4 border-b pb-2">
          <h2 className="font-semibold">{item.q}</h2>
          <p className="text-gray-700">{item.a}</p>
        </div>
      ))}
    </div>
  );
};

export default Faqs;
