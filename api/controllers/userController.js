import pool from "../db/database.js";

export const getUsers = async (req, res) => {
  let conn;

  // Get the search term from the query parameters
  const searchTerm = req.query.searchTerm || "";
  // Get the page number from the query parameters, default to 1
  const page = parseInt(req.query.page, 10) || 1;
  // Number of users per page
  const pageSize = 5;
  // Calculate the offset for the query
  const offset = (page - 1) * pageSize;

  try {
    // Get a connection from the pool
    conn = await pool.getConnection();

    // Prepare the query with the search term and pagination
    const query = `
      SELECT * FROM users
      WHERE first_name LIKE ? 
      OR last_name LIKE ? 
      OR personal_id LIKE ?
      OR mobile_number LIKE ?
      OR alternative_mobile_number LIKE ?
      OR email LIKE ?
      OR alternative_email LIKE ?
      LIMIT ? OFFSET ?`;

    // Add the wildcard % for partial matching
    const searchValue = `%${searchTerm}%`;

    // Execute the query with the search term applied to all relevant fields and pagination parameters
    const result = await conn.query(query, [
      searchValue,
      searchValue,
      searchValue,
      searchValue,
      searchValue,
      searchValue,
      searchValue,
      pageSize,
      offset,
    ]);

    // Get the total count for pagination
    const countQuery = `
      SELECT COUNT(*) as total FROM users
      WHERE first_name LIKE ? 
      OR last_name LIKE ? 
      OR personal_id LIKE ?
      OR mobile_number LIKE ?
      OR alternative_mobile_number LIKE ?
      OR email LIKE ?
      OR alternative_email LIKE ?`;

    const countResult = await conn.query(countQuery, [
      searchValue,
      searchValue,
      searchValue,
      searchValue,
      searchValue,
      searchValue,
      searchValue,
    ]);

    // Total number of matching records
    const total = Number(countResult[0].total);
    // Calculate total number of pages
    const totalPages = Math.ceil(total / pageSize);

    res.status(200).json({
      data: result,
      total,
      page,
      totalPages,
    });
  } catch (err) {
    console.error("Error: " + err);
    res.status(500).send("Error retrieving users from the database");
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

export const getAllUsers = async (req, res) => {
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
