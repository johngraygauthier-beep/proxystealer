const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

app.get('/ip-isp-info', async (req, res) => {
    try {
        const ipDataResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipDataResponse.json();

        const geoDataResponse = await fetch(`http://ip-api.com/json/${ipData.ip}`);
        const geoData = await geoDataResponse.json();

        res.send({
            ip: ipData.ip,
            isp: geoData.isp,
            country: geoData.countryName,
            regionName: geoData.regionName
        });
    } catch (error) {
        res.status(500).send('Error fetching IP and ISP information');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
