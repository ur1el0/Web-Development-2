const router = require('express').Router();
const Expense = require('../models/Expense');

// CREATE new expense
router.post('/api/expense', async (req, res) => {
    try {
        const { itemName, category, quantity, amount } = req.body;

        // Input validation (basic)
        if (!itemName || !category || !quantity || !amount) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const expense = new Expense({ itemName, category, quantity, amount });
        await expense.save();

        res.status(201).json({
            message: 'Expense successfully added',
            data: expense
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to add expense' });
    }
});

// GET all expenses
router.get('/api/expense', async (req, res) => {
    try {
        // Limit to last 100 expenses for performance
        const expenses = await Expense.find().sort({ createdAt: -1 }).limit(100);
        res.json(expenses);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to retrieve expenses' });
    }
});

// GET by index (1-based) - optional simple method
router.get('/api/expense/:index', async (req, res) => {
    try {
        const expenses = await Expense.find().sort({ createdAt: 1 }); // oldest first
        const i = parseInt(req.params.index) - 1;
        if (isNaN(i) || i < 0 || i >= expenses.length) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        res.json(expenses[i]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;