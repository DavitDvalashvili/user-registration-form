import pool from "../db/database.js";

export const getUsers = async (req, res) => {
  let conn;

  // Get the search term from the query parameters
  const searchTerm = req.query.searchTerm || "";
  // Get the page number from the query parameters, default to 1
  const page = parseInt(req.query.page, 10) || 1;
  // Number of users per page
  const pageSize = 10;
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
      users: result,
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

export const addUser = async (req, res) => {
  let conn;
  try {
    // Get the user details from the request body
    const {
      first_name,
      last_name,
      personal_id,
      date_of_birth,
      email,
      alternative_email,
      mobile_number,
      alternative_mobile_number,
      photo_url,
      position,
      gender,
    } = req.body;

    // Check if all required fields are present
    if (!first_name || !last_name || !personal_id || !date_of_birth) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Get a connection from the pool
    conn = await pool.getConnection();

    //Insert new user into database
    const query = `INSERT INTO users (first_name,
      last_name,
      personal_id,
      date_of_birth,
      email,
      alternative_email,
      mobile_number,
      alternative_mobile_number,
      photo_url,
      position,
      gender)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const result = await conn.query(query, [
      first_name,
      last_name,
      personal_id,
      date_of_birth,
      email,
      alternative_email,
      mobile_number,
      alternative_mobile_number,
      photo_url,
      position,
      gender,
    ]);

    // Send success response with the inserted user ID
    res.status(201).json({
      message: "User added successfully",
      userId: Number(result.insertId),
    });
  } catch (error) {
    console.error("Error:" + error);
    res.status(500).send("Error adding user to the database");
  } finally {
    // Release the connection back to the pool
    if (conn) conn.release();
  }
};

export const updateUser = async (req, res) => {
  let conn;
  // Get the user ID from the route parameter
  let id = req.params.id;
  try {
    // Get the user details from the request body
    const {
      first_name,
      last_name,
      personal_id,
      date_of_birth,
      email,
      alternative_email,
      mobile_number,
      alternative_mobile_number,
      photo_url,
      position,
      gender,
    } = req.body;

    // Check if the user ID is provided
    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Check if at least one field is provided for update
    if (
      !first_name &&
      !last_name &&
      !personal_id &&
      !date_of_birth &&
      !email &&
      !alternative_email &&
      !mobile_number &&
      !alternative_mobile_number &&
      !photo_url &&
      !position &&
      !gender
    ) {
      return res.status(400).json({ message: "No fields to update" });
    }

    // Get a connection from the pool
    conn = await pool.getConnection();

    // Build the query dynamically based on provided fields
    const fieldsToUpdate = [];
    const values = [];

    if (first_name) {
      fieldsToUpdate.push("first_name = ?");
      values.push(first_name);
    }
    if (last_name) {
      fieldsToUpdate.push("last_name = ?");
      values.push(last_name);
    }
    if (personal_id) {
      fieldsToUpdate.push("personal_id = ?");
      values.push(personal_id);
    }
    if (date_of_birth) {
      fieldsToUpdate.push("date_of_birth = ?");
      values.push(date_of_birth);
    }
    if (email) {
      fieldsToUpdate.push("email = ?");
      values.push(email);
    }
    if (alternative_email) {
      fieldsToUpdate.push("alternative_email = ?");
      values.push(alternative_email);
    }
    if (mobile_number) {
      fieldsToUpdate.push("mobile_number = ?");
      values.push(mobile_number);
    }
    if (alternative_mobile_number) {
      fieldsToUpdate.push("alternative_mobile_number = ?");
      values.push(alternative_mobile_number);
    }
    if (photo_url) {
      fieldsToUpdate.push("photo_url = ?");
      values.push(photo_url);
    }
    if (position) {
      fieldsToUpdate.push("position = ?");
      values.push(position);
    }
    if (gender) {
      fieldsToUpdate.push("gender = ?");
      values.push(gender);
    }

    // Construct the final query
    const query = `UPDATE users SET ${fieldsToUpdate.join(", ")} WHERE id = ?`;
    // Add userId as the last value for the WHERE clause;
    values.push(id);

    const result = await conn.query(query, values);

    // Check if the user was found and updated
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send success response
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error:" + error);
    res.status(500).send("Error updating user to the database");
  } finally {
    // Release the connection back to the pool
    if (conn) conn.release();
  }
};

export const deleteUser = async (req, res) => {
  let conn;
  // Get the user ID from the route parameter
  let id = req.params.id;
  try {
    // Get the user ID from the route parameter
    conn = await pool.getConnection();

    // First, check if the user exists
    const checkUserQuery = `SELECT * FROM users WHERE id = ?`;
    const userResult = await conn.query(checkUserQuery, [id]);

    // If the user does not exist, return a 404 status
    if (userResult.length == 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // If the user exists, proceed to delete
    const deleteQuery = `DELETE FROM users WHERE id = ?`;
    await conn.query(deleteQuery, [id]);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error: " + err);
    res.status(500).send("Error deleting user from the database");
  } finally {
    // Release the connection back to the pool
    if (conn) conn.release();
  }
};

export const deleteAlternativeContact = async (req, res) => {
  let conn;
  const id = req.params.id;
  const { type } = req.query;

  try {
    // Get a connection from the pool
    conn = await pool.getConnection();

    // Define the query and the field to update based on the type
    let query;
    if (type === "email") {
      query = `UPDATE users SET alternative_email = NULL WHERE id = ?`;
    } else if (type === "mobile") {
      query = `UPDATE users SET alternative_mobile_number = NULL WHERE id = ?`;
    } else {
      return res
        .status(400)
        .json({ message: "Invalid contact type. Use 'email' or 'mobile'." });
    }

    // Execute the query
    const result = await conn.query(query, [id]);

    // Check if the user was found and updated
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "User not found or no contact info to delete" });
    }

    // Respond based on the type
    const message =
      type === "email"
        ? "Alternative email deleted successfully"
        : "Alternative mobile number deleted successfully";

    res.status(200).json({ message });
  } catch (error) {
    console.error("Error: " + error);
    res
      .status(500)
      .send("Error deleting alternative contact info from the database");
  } finally {
    // Release the connection back to the pool
    if (conn) conn.release();
  }
};
