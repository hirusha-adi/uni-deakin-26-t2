// List drawn from: https://www.delish.com/food/g45129506/most-popular-ice-cream-flavors-america/
const icecreamArray = [
    "Vanilla",
    "Chocolate",
    "Cookies 'n Cream",
    "Strawberry",
    "Chocolate Chip",
    "Mint Chocolate Chip",
    "Chocolate Chip Cookie Dough",
    "Butter Pecan",
    "Birthday Cake",
    "Moose Tracks"
];

//  I used arrow functions, which was introduced in ES6 JavaScript.

const buildIcecreamList = () => {
    const icecreamDiv = document.getElementById("top_icecreams");

    // remove everything
    // you can also just .replaceChildren(...) at the end
    while (icecreamDiv.firstChild) {
        icecreamDiv.removeChild(icecreamDiv.firstChild);
    }

    // create list and add elements
    const orderedList = document.createElement("ol");
    icecreamArray.forEach((flavour) => {
        const listItem = document.createElement("li");
        listItem.textContent = flavour;
        orderedList.appendChild(listItem);
    });

    icecreamDiv.appendChild(orderedList);
}
