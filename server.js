const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const audioRoutes = require('./routes/audio');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({ message: 'response!'})
})

app.use('/audio', audioRoutes);

const port = 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
