// Function to shorten a URL using the Bitly API
async function shortenUrl() {
    // Get the original URL from the input field
    const originalUrl = document.getElementById('originalUrl').value;
    const accessToken = "225cac78f272f8a26a985b9526d08619f722d81f";  // Replace with your Bitly access token

    try {
        const apiUrl = 'https://api-ssl.bitly.com/v4/shorten';

        const requestBody = {
            long_url: originalUrl,
            domain: 'bit.ly'
        };

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            throw new Error('Failed to shorten the URL');
        }

        const data = await response.json();

        // Display the shortened URL and generate QR code
        const shortUrlElement = document.getElementById('shortUrl');
        const qrCodeElement = document.getElementById('qrCode');

        shortUrlElement.textContent = data.link;
        shortUrlElement.href = data.link;

        // Generate QR code using qrcode.js
        const qr = new QRCode(qrCodeElement, {
            text: data.link,
            width: 128,
            height: 128,
        });

        // Show the result section
        document.getElementById('result').style.display = 'block';

    } catch (error) {
        console.error('Error:', error.message);
        // Handle error, display a message to the user, etc.
    }
}
