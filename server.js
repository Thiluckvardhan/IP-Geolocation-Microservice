const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/geolocate', async (req, res) => {
    try {
        const ipRes = await axios.get('https://api.ipify.org?format=json');
        const ip = ipRes.data.ip;
        const response = await axios.get(`http://ip-api.com/json/${ip}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get location data' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});