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
  const handleButton = async (tipo) => {
    // alert(tipo)
    const headers = {
      "Content-Type": "application/json",
    };
    const bodyData = JSON.stringify({
      formId: tipo,
    })
    const url = `http://localhost:3000/api/users/form`;
    console.log(url)
    const options = {
      method: "POST",
      headers: headers,
      body: bodyData,
      redirect: "follow",
      mode: 'no-cors'
    };
    const respuesta = await fetch(url, options);
    const datosFormulario = await respuesta.json();
    console.log({ respuesta })
    if (respuesta.status === 200) {
      setFormulario(datosFormulario);
    }

  };
  return (
    <div style={classes.container}>
      <div style={classes.formContainer}>

        <button style={{ ...classes.button, ...classes.blue }} onClick={() => handleButton(1)}>
          Generar formulario de usuarios
        </button>
      </div>
      {formulario && (<form key={formulario.form.form_id} style={classes.form} method={formulario.form.form_method} action={formulario.form.form_action} id={formulario.form.form_id}>
        {formulario.inputs && formulario.inputs.map(input => <input key={input.id} style={classes.input} type={input.input_type} name={input.input_name} id={input.input_id} placeholder={input.input_placeholder} />)}
        {formulario.selects && formulario.selects.map(select => (<>
          <select key={select.id} style={classes.select} name={select.select_name}>
            {select.options.map(option => <option key={option.id} value={option.option_value}>{option.option_content}</option>)}
          </select>
        </>))}
        {formulario.buttons && formulario.buttons.map(button => <button key={button.id} style={{ ...classes.button, ...classes.blue }} type={button.button_type} name={button.button_name} id={button.button_id}>{button.button_content}</button>)}
      </form>)}
    </div>
  );
};

export default Formulario;
