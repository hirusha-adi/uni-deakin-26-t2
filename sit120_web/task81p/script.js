const processText = () => {
    // input values
    const inputString = document.getElementById("exampleFormControlTextarea1").value;
    const searchString = document.getElementById("searchWord").value;
    const numberCharacters = Number(document.getElementById("numberCharacters").value);

    // validation
    if (inputString === "" || searchString === "") {
        window.alert("Ensure you input a value in both fields!");
        return;
    }

    // main results
    document.getElementById("strResult1").textContent = inputString.length;
    document.getElementById("strResult2").textContent = inputString.toUpperCase();
    document.getElementById("strResult3").textContent = inputString.toLowerCase();
    document.getElementById("strResult4").textContent = inputString.toLowerCase().indexOf(searchString.toLowerCase());
    document.getElementById("strResult5").textContent = inputString.substring(0, numberCharacters);
    document.getElementById("strResult6").textContent = inputString.substring(inputString.length - numberCharacters);

    // blue letters (to support results)
    document.getElementById("searchTerm").textContent = searchString;
    document.getElementById("numberSubstringCharactersStart").textContent = numberCharacters;
    document.getElementById("numberSubstringCharactersEnd").textContent = numberCharacters;
};

const clearText = () => {
    /* clear everything */
    document.getElementById("exampleFormControlTextarea1").value = "";
    document.getElementById("searchWord").selectedIndex = 0;
    document.getElementById("numberCharacters").value = 10;

    document.getElementById("strResult1").textContent = "";
    document.getElementById("strResult2").textContent = "";
    document.getElementById("strResult3").textContent = "";
    document.getElementById("strResult4").textContent = "";
    document.getElementById("strResult5").textContent = "";
    document.getElementById("strResult6").textContent = "";

    document.getElementById("searchTerm").textContent = "???";
    document.getElementById("numberSubstringCharactersStart").textContent = "_";
    document.getElementById("numberSubstringCharactersEnd").textContent = "_";
};

/*
Sample test data:
    I scream, you scream and we all screen for ice cream! It's my favorite dessert. I love to eat every day and I also find it fun to eat ice cream in the winter.
    I scream, you scream and we all screen for ice cream! It's my favorite dessert. I love to eat every day and I also find it sad to eat ice cream in the winter.
*/
