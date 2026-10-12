document.addEventListener('DOMContentLoaded', () => {
    const ipElement = document.getElementById('ip');
    const ispElement = document.getElementById('isp');
    const locationElement = document.getElementById('location');

    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ipAddress = data.ip;
            return Promise.all([
                fetch(`https://ipapi.co/${ipAddress}/json/`),
                fetch(`https://freegeoip.app/json/${ipAddress}`)
            ]);
        })
        .then(responses => Promise.all(responses.map(response => response.json())))
        .then(data => {
            const ipData = data[0];
            const locationData = data[1];

            ipElement.textContent = ipAddress;
            ispElement.textContent = ipData.org || 'Unknown';
            locationElement.textContent = `${locationData.city}, ${locationData.region_name}, ${locationData.country_code}`;
        })
        .catch(error => {
            console.error('Error fetching IP information:', error);
            ipElement.textContent = 'Unable to fetch IP address';
            ispElement.textContent = 'N/A';
            locationElement.textContent = 'N/A';
        });
});
