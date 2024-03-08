const express=require('express');
const router=express.Router();
const con=require('../config');
const { authmiddleware } = require('../middleware');


// POST /transactions: Add a new transaction (income or expense).

router.post('/',authmiddleware,(req, res) => {
    const data = req.body;
    con.query('INSERT INTO transactions SET ?', data, (error, result, fields) => {
        if (error) {
            // If an error occurs, send the error message as the response
            res.status(500).send(error.message);
        } else {
            // If the query is successful, send the result as the response
            res.send(result);
        }
    });
});

// GET /transactions: Retrieve a list of transactions for a given period.

router.get('/', authmiddleware,(req, res) => {
    // Retrieve start and end date query parameters from the request
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    // If start date or end date is not provided, send a 400 Bad Request response
    if (!startDate || !endDate) {
        return res.status(400).send('Start date and end date are required.');
    }

    // Construct SQL query to retrieve transactions within the specified period
    const query = 'SELECT * FROM transactions WHERE transaction_date >= ? AND transaction_date <= ?';
    con.query(query, [startDate, endDate], (error, results) => {
        if (error) {
            // If an error occurs, send a 500 Internal Server Error response
            return res.status(500).send(error.message);
        }
        
        // Send the retrieved transactions as the response
        res.json(results);
    });
});


// Get API for fetching summary of transaction
// GET /transactions/summary: Retrieve a summary of transactions 
// (total income, total expenses, and savings) for a given period.

router.get('/summary', authmiddleware,(req, res) => {
    // Retrieve start and end date query parameters from the request
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    // If start date or end date is not provided, send a 400 Bad Request response
    if (!startDate || !endDate) {
        return res.status(400).send('Start date and end date are required.');
    }

    // Construct SQL queries to calculate total income and total expenses within the specified period
    const totalIncomeQuery = 'SELECT SUM(amount) AS total_income FROM transactions WHERE transaction_type = "income" AND transaction_date >= ? AND transaction_date <= ?';
    const totalExpensesQuery = 'SELECT SUM(amount) AS total_expenses FROM transactions WHERE transaction_type = "expense" AND transaction_date >= ? AND transaction_date <= ?';

    // Execute both queries in parallel
    con.query(totalIncomeQuery, [startDate, endDate], (error, incomeResult) => {
        if (error) {
            return res.status(500).send(error.message);
        }
        
        con.query(totalExpensesQuery, [startDate, endDate], (error, expensesResult) => {
            if (error) {
                return res.status(500).send(error.message);
            }
            
            // Calculate savings by subtracting total expenses from total income
            const totalIncome = incomeResult[0].total_income || 0;
            const totalExpenses = expensesResult[0].total_expenses || 0;
            const savings = totalIncome - totalExpenses;

            // Construct the summary object
            const summary = {
                totalIncome,
                totalExpenses,
                savings
            };

            // Send the summary as the response
            res.json(summary);
        });
    });
});


// Delete Transaction
// DELETE /transactions/:id: Delete a specific transaction.

router.delete('/:id', authmiddleware,(req, res) => {
    const transactionId = req.params.id;

    con.query('DELETE FROM transactions WHERE transaction_id = ?', transactionId, (error, result) => {
        if (error) {
            return res.status(500).send(error.message);
        }

        res.send('Transaction deleted successfully');
    });
});


module.exports=router;