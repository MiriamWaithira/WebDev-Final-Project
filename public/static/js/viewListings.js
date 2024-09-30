document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch(`/api/my-listings`);
        if (response.ok) {
            const listings = await response.json();
            const listingsContainer = document.getElementById('listingsContainer');

            // Clear existing listings
            listingsContainer.innerHTML = '';

            // Check if listings exist and append them
            if (listings.length > 0) {
                listings.forEach(listing => {
                    const listingElement = document.createElement('div');
                    listingElement.textContent = listing.name; // Customize based on your listing structure
                    listingsContainer.appendChild(listingElement);
                });
            } else {
                listingsContainer.textContent = 'You have not created any listings yet.';
            }
        } else {
            throw new Error('Error loading listings.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error loading listings. Please try again.');
        window.location.href = '/Sellerlogin';
    }
});



// document.addEventListener('DOMContentLoaded', async () => {
//     const user = JSON.parse(localStorage.getItem('user')); // Assuming user data is saved here
//     if (user && user.id) {
//         const userId = user.id;

//         try {
//             const response = await fetch(`/api/my-listings?userId=${userId}`);
//             if (response.ok) {
//                 const listings = await response.json();
//                 // Render listings on the page
//                 const listingsContainer = document.getElementById('listingsContainer');
                
//                 // Clear existing listings
//                 listingsContainer.innerHTML = '';

//                 // Append each listing
//                 listings.forEach(listing => {
//                     const listingElement = document.createElement('div');
//                     listingElement.textContent = listing.name; // Customize based on your listing structure
//                     listingsContainer.appendChild(listingElement);
//                 });

//                 if (listings.length === 0) {
//                     listingsContainer.textContent = 'You have not created any listings yet.';
//                 }
//             } else {
//                 throw new Error('Error loading listings.');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             alert('Error loading listings. Please try again.');
//         }
//     } else {
//         alert('User not found. Please log in again.');
//         window.location.href = '/Sellerlogin';
//     }
// });
