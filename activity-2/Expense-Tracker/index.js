const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/ExpenseDB')
.then(() => console.log('Connected to MongoDB'))    
.catch(err => console.log(err));

app.use(require('./routes/expense'));

app.listen(8080, () => {
    console.log("Server running on port 8080");
});