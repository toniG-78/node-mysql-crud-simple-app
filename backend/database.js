const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

let instance = null;

const connection = mysql.createConnection({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
});

connection.connect((err) => {
  if (!err) console.log(`DB --> ${connection.state}`);
  else console.log(err.message);
});

class DbService {
  static getDbServiceInstance() {
    return instance ? instance : new DbService();
  }

  //method GET
  async getAllData() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM names";
        connection.query(query, (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results); //it's an array of objets
          //console.log(results)
        });
      });
      //console.log(response);
      return response;
      //
    } catch (err) {
      console.log(err);
    }
  }

  //method POST
  async insertName(name) {
    try {
      const date_added = new Date();

      const insertId = await new Promise((resolve, reject) => {
        const query = "INSERT INTO names (name, date_added) VALUES (?, ?)";
        connection.query(query, [name, date_added], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result.insertId);
          //console.log(result.insertId);
        });
      });
      return {
        id: insertId,
        name: name,
        date_added: date_added,
      };
      //
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = DbService;
