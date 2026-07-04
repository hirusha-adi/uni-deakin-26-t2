const makeStars = (rating) => {
    let stars = "";

    // actual rated stars
    for (let i = 0; i < rating; i++) {
        stars += "★";
    }

    // remaining stars out of 5
    for (let i = 0; i < (5 - rating); i++) {
        stars += "☆";
    }

    return stars;
};

const submitRating = () => {
    const nameInput = document.getElementById("nameInput");
    const ratingInput = document.getElementById("ratingInput");

    // validation
    const name = nameInput.value.trim();
    let rating = Number(ratingInput.value);

    if (rating < 0 || rating > 5 || Number.isNaN(rating)) {
        window.alert("Warning! Rating must be between 0 and 5. Setting to default 5");
        rating = 5;
    }

    // date/time
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    document.getElementById("last-updated-date").textContent = date;
    document.getElementById("last-updated-time").textContent = time;

    // name
    const strongName = document.createElement("strong");
    strongName.textContent = name || "Anonymous";

    // list item
    const listItem = document.createElement("li");
    listItem.append(`[${date} ${time}] `, strongName, ` gave a rating of ${makeStars(rating)}`);

    // add list item to list
    document.getElementById("ratingsList").appendChild(listItem);

    // clear values out at the very end
    nameInput.value = "";
    ratingInput.value = "";
};
