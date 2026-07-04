let clickCount = 0;

const buttonClicked = () => {
    const button = document.getElementById("btn-start");
    const output = document.getElementById("output");

    clickCount++;

    if (clickCount > 5) {
        // reset counters and update button's text
        output.style.display = "none";
        output.innerHTML = "";
        output.style.backgroundColor = "transparent";
        button.value = "Click to Re-start";
        clickCount = 0;
        return;
    }

    // get dates
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString
    const now = new Date();
    const currentTime = now.toLocaleTimeString("en-AU", { timeZoneName: "long" });
    const currentDate = now.toDateString();

    // update block
    output.style.display = "block";
    output.style.backgroundColor = "transparent";
    output.innerHTML = `
                <h2>Well done, you clicked the button!</h2>

                <ul>
                    <li>At time: <em>${currentTime}</em></li>
                    <li>On date: <em>${currentDate}</em></li>
                </ul>

                <h2>Move your cursor/mouse over this div element to change the background colour to violet.</h2>
            `;

    // udpate button
    button.value = `Try again... Pressed ${clickCount} times`;
};

const changeBackground = () => {
    const output = document.getElementById("output");

    if (output.innerHTML.trim() !== "") {
        // only if the element is there
        // (element has innterHTML)
        output.style.backgroundColor = "violet";
    }
};

const resetBackground = () => {
    const output = document.getElementById("output");
    output.style.backgroundColor = "transparent";
};