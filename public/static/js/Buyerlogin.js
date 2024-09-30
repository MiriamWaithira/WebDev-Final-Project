document.getElementById('buyerLoginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        if (response.ok) {
            // Redirect to listings on sale page
            window.location.href = '/listingsonSale';
        } else {
            const data = await response.json();
            alert(data.message);
        }
    } catch (error) {
        alert('Error logging in. Please try again.');
    }
});