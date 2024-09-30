document.getElementById('sellerLoginForm').addEventListener('submit', async function(e) {
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
            const data = await response.json(); // Assuming your server sends back user data after login
            localStorage.setItem('user', JSON.stringify(data.user)); // Save user to localStorage
            window.location.href = '/myDash'; // or the appropriate page for the seller
        } else {
            alert('Login failed.');
        }
    } catch (error) {
        alert('Error logging in. Please try again.');
    }
});