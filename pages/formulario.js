import React from "react";

const Formulario = () => {
  const handleButton = async (tipo) => {
    const tipo = tipo === 1 ? "" : "";
    const headers = {
      "Content-Type": "application/json",
    };
    const url = `${window.location.hostname}/api/users/form`;
    const options = {
      method: "POST",
      headers: headers,
      redirect: "follow",
    };

    const respuesta = await fetch(url, options);
  };
  return (
    <div>
      <button onClick={() => handleButton(1)}>
        Generar formulario de usuarios
      </button>
      <button onClick={() => handleButton(2)}>
        Generar formulario de actividades
      </button>
    </div>
  );
};

export default Formulario;
