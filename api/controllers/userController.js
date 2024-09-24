import pool from "../db/database.js";

export const getUsers = async (req, res) => {
  let conn;
  try {
    // Get a connection from the pool
    conn = await pool.getConnection();

    const result = await conn.query("SELECT * FROM users");

    res.status(200).json(result);
  } catch (err) {
    console.error("Error: " + err);
    es.status(500).send("Error retrieving users from the database");
  } finally {
    // Release the connection back to the pool
    if (conn) conn.release();
  }
};

export const getUser = async (req, res) => {
  let conn;
  const id = req.params.id;
  try {
    // Get a connection from the pool
    conn = await pool.getConnection();

    // Use the connection to query the database for the user by ID
    const result = await conn.query("SELECT * FROM users WHERE id = ?", [id]);

    // If user is found, return the user data
    if (result.length > 0) {
      res.status(200).json(result[0]);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error: " + error);
    res.status(500).send("Error retrieving user from the database");
  } finally {
    // Release the connection back to the pool
    if (conn) conn.release();
  }
};
