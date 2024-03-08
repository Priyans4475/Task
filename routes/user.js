const express=require('express');
const router=express.Router();
const con=require('../config')
const zod=require('zod');
const bcrypt = require('bcrypt');
require("dotenv").config();
const jwt = require('jsonwebtoken'); // Import JWT library


// zod for input validation
const signupSchema = zod.object({
    email: zod.string().email(),
    password:zod.string(),
    username:zod.string()
   
  });

//   signup api
router.post('/signup', async (req, res) => {
    const body = req.body;
    const { success } = signupSchema.safeParse(body);
    if (!success) {
        return res.json({
            message: 'Invalid user data'
        });
    }

    // Check if the username already exists in MySQL
    const existingUserQuery = 'SELECT * FROM users WHERE email = ?';
    con.query(existingUserQuery, [body.email], async (err, results) => {
        if (err) {
            console.error('Error checking existing user in MySQL:', err);
            return res.status(500).send('Error signing up');
        }

        if (results.length > 0) {
            return res.status(411).json({
                message: "Email already taken/Incorrect inputs"
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(body.password, 10);

        // Insert user data into MySQL
        const insertUserQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        con.query(insertUserQuery, [body.username, body.email, hashedPassword], async (err, result) => {
            if (err) {
                console.error('Error inserting user into MySQL:', err);
                return res.status(500).send('Error signing up');
            }

            console.log('User inserted into MySQL:', result);

            // Generate JWT token
            const token = jwt.sign({ userId: result.insertId }, process.env.JWT_SECRET);

            res.json({
                msg: 'User created successfully',
                token:token
            });
        });
    });
});


// Signin/ Login API
router.post('/signin', (req, res) => {
    const { email, password } = req.body;

    // Retrieve user data from MySQL
    const sql = 'SELECT * FROM users WHERE email = ?';
    con.query(sql, [email], async (err, results) => {
        if (err) {
            console.error('Error retrieving user from MySQL:', err);
            return res.status(500).send('Error signing in');
        }

        if (results.length === 0) {
            return res.status(401).send('Invalid email or password');
        }

        const user = results[0];

        // Compare the hashed password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).send('Invalid username or password');
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

        res.json({ token });
    });
});

router.get('/users', (req, res) => {
    // MySQL query to fetch users
    const getUsersQuery = 'SELECT * FROM users';

    // Execute the query
    con.query(getUsersQuery, (err, results) => {
        if (err) {
            console.error('Error retrieving users:', err);
            return res.status(500).send('Error retrieving users');
        }

        // If users are found, return them as a JSON response
        res.json(results);
    });
});


module.exports=router;

