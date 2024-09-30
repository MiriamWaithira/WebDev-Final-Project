// public/static/js/registerBuyer.js
document.getElementById('registerBuyerForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/register-buyer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });
        const data = await response.json();

        if (response.ok) {
            alert('Registration successful! You can now log in.');
            window.location.href = '/Buyerlogin';
        } else {
            alert(data.message);
        }
    } catch (error) {
        alert('Error registering. Please try again.');
    }
});
