const express = require('express');
const proxy = require('express-http-proxy');
const cors = require("cors");
const getArguments = require('get-arguments-lib');
const processArguments = getArguments(process.argv);
const port = +processArguments.port || 3007;

const app = express();
app.use(cors());
app.use('/', proxy('localhost:3001'))



app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});
