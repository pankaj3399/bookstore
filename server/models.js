const sqlite3 = require("sqlite3").verbose();

// Connect to the SQLite database
const db = new sqlite3.Database("bookstore.db", (err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
  } else {
    console.log("Connected to the database");
  }
});

// SQL command to create a new table
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS Sales (
    id INTEGER PRIMARY KEY,
    book_id INTEGER,
    book_title TEXT,
    quantity INTEGER,
    cost DECIMAL,
    FOREIGN KEY (book_id) REFERENCES Books(book_id)
  )
`;

// Execute the SQL command to create the table
db.run(createTableQuery, (err) => {
  if (err) {
    console.error("Error creating table:", err.message);
  } else {
    console.log("Table created successfully");
  }
});

// Close the database connection
db.close((err) => {
  if (err) {
    console.error("Error closing database connection:", err.message);
  } else {
    console.log("Database connection closed");
  }
});
