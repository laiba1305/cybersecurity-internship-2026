// VULNERABLE CODE (Juice Shop original)
const query = `SELECT * FROM Products WHERE name LIKE '%${req.query.q}%'`;

// SECURE FIX - Parameterized Query
const products = await db.query(
    'SELECT * FROM Products WHERE name LIKE ?',
    [`%${req.query.q}%`]
);