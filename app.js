const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());

// Services
app.use('/test/', require('./src/services/test-services'));

app.get('/', (req, res) => {
    res.send('Server root');
});

app.listen(port, () => {
    console.log(`Running at http://localhost:${port}`);
});