import pool from "../db/database.js";

export const getPositions = async (req, res) => {
  let conn;

  try {
    // Get a connection from the pool
    conn = await pool.getConnection();

    const result = await conn.query(`SELECT * FROM positions`);

    // Send the result back in the response
    res.status(200).json(result);
  } catch (err) {
    console.error("Error: " + err);
    res.status(500).send("Error retrieving positions from the database");
  } finally {
    // Release the connection back to the pool
    if (conn) conn.release();
  }
};
