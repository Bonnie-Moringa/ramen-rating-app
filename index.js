//Dom loading
document.addEventListener("DOMContentLoaded", () => {
    displayRamens();
    addSubmitListener();
})


const ramens = [
    { id: 1, name: "Gyutoksu Ramen", restaurant: "Ramen-ya", image: "assets/gyukotsu.jpg" },
    { id: 2, name: "Kojiro Ramen", restaurant: "Ramen-ya", image: "assets/kojiro.jpg" },
    { id: 3, name: "Naruto Ramen", restaurant: "Ramen-ya", image: "assets/naruto.jpg" },
    { id: 4, name: "Nirvana Ramen", restaurant: "Ramen-ya", image: "assets/nirvana.jpg" },
    { id: 5, name: "Shoyu Ramen", restaurant: "Ramen-ya", image: "assets/shoyu.jpg" },
 ];
 
// Function to display all ramen from the array
function displayRamens() {
    const ramenMenu = document.getElementById("ramen-menu");
    ramenMenu.innerHTML = '';  // Clear the menu before rendering new ramen

    ramens.forEach(ramen => renderOneRamen(ramen));
    // Display the details of the first ramen
    if (ramens.length > 0) {
        showRamenDetails(ramens[0]);
    }
}

// Adds event listener to form for new ramen submission
function addSubmitListener() {
    const ramenForm = document.getElementById("new-ramen");

    ramenForm.addEventListener("submit", (e) => {
        e.preventDefault();
        addNewRamen();
        ramenForm.reset();
    });
}

// Adds one ramen to the menu, along with event listeners for display and delete
function renderOneRamen(ramen) {
    const ramenImg = document.createElement("img");
    const ramenDiv = document.createElement("div");
    const ramenMenu = document.getElementById("ramen-menu");

    ramenImg.src = ramen.image;
    ramenImg.alt = ramen.name;
    ramenImg.classList.add("ramen-img"); 

    ramenMenu.append(ramenDiv);
    ramenDiv.append(ramenImg);

    // Add an event listener to display ramen details when clicked
    ramenImg.addEventListener("click", () => showRamenDetails(ramen));

    // Optionally add a delete button to each ramen if needed
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");
    ramenDiv.append(deleteButton);

    deleteButton.addEventListener("click", () => deleteRamen(ramen.id, ramenDiv));
}

// Displays ramen details when clicked
function showRamenDetails(ramen) {
    const detailImage = document.getElementById("detail-image");
    const detailName = document.getElementById("detail-name");
    const detailRestaurant = document.getElementById("detail-restaurant");
    const detailRating = document.getElementById("detail-rating");
    const detailComment = document.getElementById("detail-comment");

    detailImage.src = ramen.image;
    detailName.textContent = ramen.name;
    detailRestaurant.textContent = ramen.restaurant;
    detailRating.textContent = ramen.rating;
    detailComment.textContent = ramen.comment;
}



// Adds a new ramen to the array, then renders it
function addNewRamen() {
    const newName = document.getElementById("new-name").value;
    const newRestaurant = document.getElementById("new-restaurant").value;
    const newImage = document.getElementById("new-image").value;
    const newRating = document.getElementById("new-rating").value;
    const newComment = document.getElementById("new-comment").value;

    const newRamen = {
        id: ramens.length + 1,  
        name: newName,
        restaurant: newRestaurant,
        image: newImage,
        rating: newRating,
        comment: newComment
    };

    // Add the new ramen to the array
    ramens.push(newRamen);

    // Render the new ramen
    renderOneRamen(newRamen);

    // Show the details of the new ramen
    showRamenDetails(newRamen);
}

// Deletes a ramen from the array and the menu
function deleteRamen(id, ramenDiv) {
    // Find the ramen object by id
    const ramenIndex = ramens.findIndex(ramen => ramen.id === id);
    if (ramenIndex !== -1) {
        // Remove the ramen from the array
        ramens.splice(ramenIndex, 1);
    }

    // Remove the corresponding ramen from the menu
    ramenDiv.remove();

    // Reset the displayed ramen info if needed
    const placeholderInfo = {
        "name": "Click a ramen!",
        "restaurant": ":3",
        "image": "./assets/image-placeholder.jpg",
        "rating": "Select a ramen to display its rating!",
        "comment": "Same deal."
    };

    showRamenDetails(placeholderInfo);
}