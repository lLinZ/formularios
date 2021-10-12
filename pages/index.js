import { useState } from "react";
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
    padding: "5px",
    outline: "none",
  },
  label: {
    cursor: "pointer",
  },
  button: {
    border: "none",
    background: "dodgerblue",
    color: "white",
    borderRadius: "5px",
    padding: "5px",
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

export const getServerSideProps = async (req, res) => {
  const fields = "";
  return {
    props: {
      fields: fields,
    },
  };
};

export default function Home() {
  const [form, setForm] = useState([]);
  const [singleField, setSingleField] = useState();

  const generateForm = async (cant) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const raw = JSON.stringify({ cant: cant });
    const url = `http://${window.location.host}/api/generateForm`;
    const options = {
      method: "POST",
      headers: headers,
      body: raw,
    };
    const response = await fetch(url, options);
    const data = await response.json();
    setForm(data);
  };
  const getFieldById = async (id) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const raw = JSON.stringify({ id: id });
    const url = `http://${window.location.host}/api/getField`;
    const options = {
      method: "POST",
      headers: headers,
      body: raw,
    };
    try {
      const response = await fetch(url, options);
      try {
        const data = await response.json();
      } catch (err) {
        console.error({ err });
      }
    } catch (err) {
      console.error({ err });
    }
  };
  const handleForm = (e) => {
    e.preventDefault();

    console.log(e.target[0]);
  };
  return (
    <div style={classes.container}>
      <div style={classes.formContainer}>
        <button
          style={{ ...classes.button, ...classes.green }}
          onClick={() => generateForm(1)}
        >
          Generar formulario con 1 campo
        </button>
        <button
          style={{ ...classes.button, ...classes.orange }}
          onClick={() => generateForm(2)}
        >
          Generar formulario con 2 campos
        </button>
        <button
          style={{ ...classes.button, ...classes.blue }}
          onClick={() => generateForm(3)}
        >
          Generar formulario con 3 campos
        </button>
      </div>
      <form onSubmit={handleForm} style={classes.form}>
        <h1>Formulario autogenerado</h1>
        {form.length > 0 &&
          form.map((campo) => (
            <div
              className="form-group"
              key={campo.id}
              style={classes.formGroup}
            >
              <label
                className={campo.class_label}
                htmlFor={campo.idcampo}
                style={classes.label}
              >
                <b>{campo.label}</b>
              </label>
              <input
                id={campo.idcampo}
                name={campo.name}
                placeholder={campo.placeholder}
                pattern={campo.pattern}
                type={campo.type}
                size={campo.size}
                className={campo.classes}
                maxLength={campo.maxlength}
                title={campo.title}
                style={classes.input}
              />
            </div>
          ))}
        <button type="submit" style={{ ...classes.button, ...classes.blue }}>
          Enviar
        </button>
      </form>

      <form>
        <select>
          <option></option>
        </select>
        <h1>Campo obtenido por ID:</h1>
        {singleField}
      </form>
    </div>
  );
}
