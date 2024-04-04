const express = require('express');
const app = express();
const PORT = 4000;

let requestCounter = 0;

app.get('/api', (req, res) => {
    if (requestCounter >= 50) {
        return res.status(429).send('Rate limit exceeded');
    }

    const delay = Math.floor(Math.random() * 1000);
    setTimeout(() => {
        res.send({ index: req.query.index });
    }, delay);
});


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
