import connection from "../../database/conection";
connection.connect();
export default async function handler(req, res) {
  const cant = req.body.cant;
  connection.query(
    `SELECT * FROM formularios WHERE 1=1 LIMIT ${cant}`,
    function (error, results, fields) {
      res.status(200).json(results);
    }
  );
}
