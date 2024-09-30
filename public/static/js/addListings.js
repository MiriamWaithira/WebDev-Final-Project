//addListings.js
document.getElementById('add-listing-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const category = document.getElementById('category').value;
    const type = document.getElementById('type').value;
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const cost = document.getElementById('cost').value;
    const quantity = document.getElementById('quantity').value;
    const contacts = document.getElementById('contacts').value;
    const workingHours = document.getElementById('workingHours').value;

    const response = await fetch('/create-listing', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category, type, name, description, cost, quantity, contacts, workingHours }),
        credentials: 'include', // Include credentials for cookie-based sessions
    });

    const data = await response.json();
    alert(data.message);
    if (response.ok) {
        // Redirect to the view-listings page after creating the listing
        window.location.href = '/view-listings';
    };
});
