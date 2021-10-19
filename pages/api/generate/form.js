export default async function handler(req, res) {
  const mysql = require("mysql2/promise");
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "db_form",
  });
  const { formId } = req.body;
  console.log(req.body);
  const queries = {
    buscarForm: `SELECT * FROM forms WHERE id = ?`,
    buscarInputs: `SELECT * FROM inputs WHERE form_id = ?`,
    buscarButtons: `SELECT * FROM buttons WHERE form_id = ?`,
    buscarSelects: `SELECT * FROM selects WHERE form_id = ?`,
    buscarOptions: `SELECT * FROM options WHERE select_id = ?`,
  };

  // Recordsets
  const [formRows, formFields] = await connection.execute(queries.buscarForm, [
    formId,
  ]);
  const [inputRows, inputFields] = await connection.execute(
    queries.buscarInputs,
    [formId]
  );
  const [buttonRows, buttonFields] = await connection.execute(
    queries.buscarButtons,
    [formId]
  );
  const [selectRows, selectFields] = await connection.execute(
    queries.buscarSelects,
    [formId]
  );

  // Extraccion de datos
  const form = formRows[0];

  if (selectRows.length > 0) {
    for (let i = 0; i < selectRows.length; i++) {
      const [optionRows, optionFields] = await connection.execute(
        queries.buscarOptions,
        [selectRows[i].id]
      );
      selectRows[i].options = optionRows;
    }
  }

  res.status(200).json({
    form: form,
    selects: selectRows,
    inputs: inputRows,
    buttons: buttonRows,
  });
}
