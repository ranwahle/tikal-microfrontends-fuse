const express = require('express');
const getArguments = require('get-arguments-lib');

const app = express();

const processArguments = getArguments(process.argv);

const port = +processArguments.port || 300;

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
