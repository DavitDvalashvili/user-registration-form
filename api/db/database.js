import mariadb from "mariadb";

const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "Dvala.2021",
  database: "user_registration_schema",
  port: 3308,
});

// Export the pool for use in other modules
export default pool;
