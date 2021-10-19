import React, { useState, useEffect } from "react";

const classes = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    boxShadow: "0px 0px 7px rgba(0,0,0,0.2)",
    padding: "10px",
    margin: "10px",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  formGroup: {
    margin: "5px",
    padding: "5px",
    display: "flex",
    flexDirection: "column",
  },
  input: {
    border: "1px solid rgba(220,220,220,0.1)",
    background: "rgba(220,220,220,0.3)",
    borderRadius: "15px",
    padding: "10px",
    outline: "none",
    margin: "5px auto",
  },
  select: {
    border: "1px solid rgba(220,220,220,0.1)",
    background: "rgba(220,220,220,0.3)",
    borderRadius: "15px",
    padding: "10px",
    outline: "none",
    margin: "5px auto",
  },
  label: {
    cursor: "pointer",
  },
  button: {
    border: "none",
    background: "dodgerblue",
    color: "white",
    borderRadius: "5px",
    padding: "10px",
    margin: "10px",
    width: "50%",
    cursor: "pointer",
  },
  blue: {
    background: "dodgerblue",
  },
  green: {
    background: "yellowgreen",
  },
  orange: {
    background: "orange",
  },
};

const Formulario = () => {
  const [formulario, setFormulario] = useState(null);

  // Solicitud para generar el formulario
  const handleButton = async (formid) => {
    // Cabecera de la solicitud HTTP a la API
    const headers = {
      "Content-Type": "application/json",
    };
    // Cuerpo de la solicitud HTTP a la API
    const bodyData = JSON.stringify({
      formId: formid,
    });
    // URL de la API
    const url = `${window.location.origin}/api/generate/form`;
    console.log(url);
    // Options de la solicitud
    const options = {
      method: "POST",
      headers: headers,
      body: bodyData,
      redirect: "follow",
    };
    // Se ejecuta la solicitud
    try {
      const respuesta = await fetch(url, options);

      // Si el status de la respuesta HTTP es 200, entonces se parsea
      if (respuesta.status === 200) {
        const datosFormulario = await respuesta.json();
        // Se almacena en el state el formulario traido de la BD
        setFormulario(datosFormulario);
      }
    } catch (err) {
      // En caso de ocurrir un error, revisar consola
      console.log({ err });
    }
  };
  return (
    <div style={classes.container}>
      <div style={classes.formContainer}>
        <button
          style={{ ...classes.button, ...classes.blue }}
          onClick={() => handleButton(1)}
        >
          Generar formulario 1
        </button>
        <button
          style={{ ...classes.button, ...classes.blue }}
          onClick={() => handleButton(2)}
        >
          Generar formulario 2
        </button>
        <button
          style={{ ...classes.button, ...classes.blue }}
          onClick={() => handleButton(3)}
        >
          Generar formulario 3
        </button>
        <button
          style={{ ...classes.button, ...classes.blue }}
          onClick={() => handleButton(4)}
        >
          Generar formulario 4
        </button>
      </div>
      {formulario && (
        <form
          key={`form-${formulario.form.id}`}
          style={classes.form}
          method={formulario.form.form_method}
          action={formulario.form.form_action}
          id={formulario.form.form_id}
        >
          {formulario.inputs &&
            formulario.inputs.map((input) => (
              <input
                key={`input-${input.id}`}
                style={classes.input}
                type={input.input_type}
                name={input.input_name}
                id={input.input_id}
                placeholder={input.input_placeholder}
              />
            ))}
          {formulario.selects &&
            formulario.selects.map((select) => (
              <>
                <select
                  key={`select-${select.id}`}
                  style={classes.select}
                  name={select.select_name}
                >
                  {select.options.map((option) => (
                    <option
                      key={`option-${option.id}-${option.option_value}-${select.id}`}
                      value={option.option_value}
                    >
                      {option.option_content}
                    </option>
                  ))}
                </select>
              </>
            ))}
          {formulario.buttons &&
            formulario.buttons.map((button) => (
              <button
                key={`button-${button.id}`}
                style={{ ...classes.button, ...classes.blue }}
                type={button.button_type}
                name={button.button_name}
                id={button.button_id}
              >
                {button.button_content}
              </button>
            ))}
        </form>
      )}
    </div>
  );
};

export default Formulario;
