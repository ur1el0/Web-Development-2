const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: [true, "Item name is required"],
        trim: true,
        maxlength: 100
    },
    category: {
        type: String,
        required: [true, "Category is required"],
        trim: true,
        maxlength: 50,
        index: true // improves queries by category
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: [1, "Quantity must be at least 1"]
    },
    amount: {
        type: Number,
        required: [true, "Amount is required"],
        min: [0, "Amount must be non-negative"]
    },
    totalAmount: {
        type: Number,
        min: [0, "Total amount must be non-negative"]
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: true
    }
});

// Pre-save hook to compute totalAmount
ExpenseSchema.pre('save', async function() {
    this.totalAmount = this.amount * this.quantity;
});

// Optional: compound index for faster reporting
ExpenseSchema.index({ category: 1, createdAt: -1 });

module.exports = mongoose.model('Expense', ExpenseSchema, 'Expenses');