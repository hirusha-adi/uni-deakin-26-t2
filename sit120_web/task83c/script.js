const showMessage = (inputId, messageId, message, valid) => {
    const input = document.getElementById(inputId);
    const messageBox = document.getElementById(messageId);

    // update text / message
    messageBox.textContent = message;

    // update styles
    if (valid) {
        messageBox.classList.remove("text-danger");
        messageBox.classList.add("text-success");

        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
    } else {
        messageBox.classList.remove("text-success");
        messageBox.classList.add("text-danger");

        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
    }
};

const validation = (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const unit = document.getElementById("unit").value.trim();
    const phone = document.getElementById("phone").value.trim();

    // name
    if (name === "") {
        showMessage("name", "namemsg", "You did not enter your name", false);
    } else {
        showMessage("name", "namemsg", "Valid", true);
    }

    // email
    const deakinEmail = email.trim().toLowerCase();
    if (!validator.isEmail(deakinEmail, { host_whitelist: ["deakin.edu.au"] })) {
        showMessage("email", "emailmsg", "Must be your deakin email '@deakin.edu.au'", false);
    } else {
        showMessage("email", "emailmsg", "Valid", true);
    }
    // ---
    // or just do a `.endsWith("@deakin.edu.au")`
    // ---

    // unit code validation: 3 letters + 3 numbers
    const unitPattern = /^[A-Za-z]{3}[0-9]{3}$/;
    if (!unitPattern.test(unit)) {
        showMessage("unit", "unitmsg", "Unit code MUST be in format 'ABC123'", false);
    } else {
        showMessage("unit", "unitmsg", "Valid", true);
    }

    // phone validation
    try {
        const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
        const phoneNumber = phoneUtil.parseAndKeepRawInput(phone, "AU");

        if (!phoneUtil.isPossibleNumber(phoneNumber)) {
            showMessage("phone", "phonemsg", "Phone number must be exactly 10 digits", false);
        } else if (!phoneUtil.isValidNumberForRegion(phoneNumber, "AU")) {
            showMessage("phone", "phonemsg", "Phone number is not a valid Australian number", false);
        } else {
            showMessage("phone", "phonemsg", "Valid", true);
        }
    } catch (error) {
        showMessage("phone", "phonemsg", "Phone number must be a valid Australian phone number", false);
    }
};

const clearMessages = () => {
    const messages = ["namemsg", "emailmsg", "unitmsg", "phonemsg"];
    const inputs = ["name", "email", "unit", "phone"];

    messages.forEach((id) => {
        const messageBox = document.getElementById(id);
        messageBox.textContent = "";
        messageBox.classList.remove("text-success", "text-danger");
    });

    inputs.forEach((id) => {
        const input = document.getElementById(id);
        input.classList.remove("is-valid", "is-invalid");
    });
};