const express = require('express');
const app = express();
const port = 5000;
const route = require('./routes/index')

app.use(express.json());

app.use('/api/v1', route);

app.listen(port, () => console.log(`listening on port ${port}`));