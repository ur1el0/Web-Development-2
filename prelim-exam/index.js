const express = require('express');
const app = express();

app.use(express.json()); 

const route = require('./route');
app.use(route);

app.listen(8080, () => {
    console.log("Server running on port 8080");
});