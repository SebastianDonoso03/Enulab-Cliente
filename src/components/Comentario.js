import React, { useState } from "react";
import { Button, Input, message } from "antd";

const Comments = () => {
  const [comment, setComment] = useState("");

  const handleSubmitComment = () => {
    if (!comment) {
      message.error("Por favor, escribe un comentario.");
      return;
    }
    message.success("¡Gracias por tu comentario!");
    console.log("Comentario enviado:", comment);
    setComment("");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold text-center mb-4">💬 Comentarios</h2>
      <p className="text-gray-600 text-center mb-4">
        Comparte tu experiencia y ayúdanos a mejorar.
      </p>
      <Input.TextArea rows={4} placeholder="Escribe tu comentario aquí..." value={comment} onChange={(e) => setComment(e.target.value)} />
      <Button type="primary" block className="mt-4" onClick={handleSubmitComment}>
        Enviar Comentario
      </Button>
    </div>
  );
};

export default Comments;
