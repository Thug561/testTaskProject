const express = require('express');
const app = express();
const PORT = 4000;

app.get('/api', (req, res) => {
    const delay = Math.floor(Math.random() * 1000);
    setTimeout(() => {
        res.send({ index: req.query.index });
    }, delay);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
