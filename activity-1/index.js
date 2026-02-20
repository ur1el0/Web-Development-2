const express = require('express');

const app = express();

const route = require('./route');

app.use(route);

const port = 8080;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});