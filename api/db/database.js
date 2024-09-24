import mariadb from "mariadb";

const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "Dvala.2021",
  database: "user_registration_schema",
  port: 3308,
});

// pool
//   .getConnection()
//   .then((conn) => {
//     console.log("connected to the mariaDB database !");
//     conn.end();
//   })
//   .catch((err) => {
//     console.log("not connected due to error: " + err);
//   });

// Export the pool for use in other modules
export default pool;
