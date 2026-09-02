"use strict";

// all the required/pattern/maxlength stuff got pulled out of contact.html,
// so this file is doing 100% of the validation now
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const nameInput = document.getElementById("contact-name");
  const emailInput = document.getElementById("contact-email");
  const phoneInput = document.getElementById("contact-phone");
  const reasonSelect = document.getElementById("contact-reason");
  const messageInput = document.getElementById("contact-message");
  const replyRadios = form.querySelectorAll('input[name="reply-method"]');

  const scanDetails = document.getElementById("scan-details");
  const messageCounter = document.getElementById("message-counter");
  const formSuccess = document.getElementById("form-success");

  const MESSAGE_MAX_LENGTH = 600;
  const SCAN_RELATED_REASONS = ["incorrect-match", "feedback"];

  // RFC 5322 "official standard" email pattern, copied straight from
  // https://www.regular-expressions.info/email.html - yes it's huge, that's
  // the actual spec-accurate one (quoted local parts, IP-literal domains, all of it)
  const EMAIL_PATTERN = /^(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;

  // E.164 international format, which is what RFC 3966's tel URI spec uses
  // for global numbers - https://www.rfc-editor.org/rfc/rfc3966.html (section 3,
  // "global-number-digits"). + then 1-15 digits, first digit after + isn't 0
  const PHONE_PATTERN = /^\+[1-9]\d{1,14}$/;

  function checkName() {
    const value = nameInput.value.trim();
    if (value.length === 0) {
      return { isValid: false, message: "Enter your name." };
    }
    if (value.length < 2) {
      return { isValid: false, message: "Name must be at least 2 characters." };
    }
    return { isValid: true, message: "Looks good." };
  }

  function checkEmail() {
    const value = emailInput.value.trim();
    if (value.length === 0) {
      return { isValid: false, message: "Enter your email address." };
    }
    if (!EMAIL_PATTERN.test(value)) {
      return { isValid: false, message: "Enter a valid email, e.g. name@example.com." };
    }
    return { isValid: true, message: "Looks good." };
  }

  function checkPhone() {
    const value = phoneInput.value.trim();
    if (value.length === 0) {
      return { isValid: true, message: "" }; // phone is optional, empty is fine
    }
    if (!PHONE_PATTERN.test(value)) {
      return { isValid: false, message: "Enter your number in international format, e.g. +61400000000." };
    }
    return { isValid: true, message: "Looks good." };
  }

  function checkReason() {
    if (reasonSelect.value === "") {
      return { isValid: false, message: "Choose a reason for contacting us." };
    }
    return { isValid: true, message: "Looks good." };
  }

  function checkReplyMethod() {
    const hasSelection = Array.from(replyRadios).some((radio) => radio.checked);
    if (!hasSelection) {
      return { isValid: false, message: "Choose how you'd like us to reply." };
    }
    return { isValid: true, message: "Looks good." };
  }

  function checkMessage() {
    const value = messageInput.value.trim();
    if (value.length === 0) {
      return { isValid: false, message: "Write a short message." };
    }
    if (value.length < 10) {
      return { isValid: false, message: "Message must be at least 10 characters." };
    }
    if (value.length > MESSAGE_MAX_LENGTH) {
      return { isValid: false, message: `Message must be ${MESSAGE_MAX_LENGTH} characters or fewer.` };
    }
    return { isValid: true, message: "Looks good." };
  }

  // shared helper so every field paints its border/message the same way
  function applyFieldResult(fieldId, feedbackId, result, options = {}) {
    const { silentWhenEmpty = false } = options;
    const wrapper = document.getElementById(fieldId);
    const feedback = document.getElementById(feedbackId);

    if (silentWhenEmpty && result.isValid && result.message === "") {
      wrapper.classList.remove("is-invalid", "is-valid");
      feedback.textContent = "";
      return result.isValid;
    }

    wrapper.classList.toggle("is-invalid", !result.isValid);
    wrapper.classList.toggle("is-valid", result.isValid);
    feedback.textContent = result.message;
    feedback.classList.toggle("is-error", !result.isValid);
    feedback.classList.toggle("is-success", result.isValid);
    return result.isValid;
  }

  function updateMessageCounter() {
    const length = messageInput.value.length;
    messageCounter.textContent = String(length);
    messageCounter.classList.toggle("is-over-limit", length > MESSAGE_MAX_LENGTH);
  }

  messageInput.addEventListener("input", updateMessageCounter);

  // on blur we run the full check and show red if it's wrong, but while
  // typing we only ever flip it to green the moment it becomes valid
  // nobody wants to see "invalid" flash up after every keystroke
  function wireRealTimeValidation(input, fieldId, feedbackId, checkFn, options) {
    input.addEventListener("blur", () => applyFieldResult(fieldId, feedbackId, checkFn(), options));
    input.addEventListener("input", () => {
      const result = checkFn();
      if (result.isValid) {
        applyFieldResult(fieldId, feedbackId, result, options);
      }
    });
  }

  wireRealTimeValidation(nameInput, "name-field", "name-feedback", checkName);
  wireRealTimeValidation(emailInput, "email-field", "email-feedback", checkEmail);
  wireRealTimeValidation(phoneInput, "phone-field", "phone-feedback", checkPhone, { silentWhenEmpty: true });

  // only bother asking for the scan date/additive if that's actually what they're contacting us about
  function updateScanDetailsVisibility() {
    scanDetails.hidden = !SCAN_RELATED_REASONS.includes(reasonSelect.value);
  }

  reasonSelect.addEventListener("change", updateScanDetailsVisibility);
  updateScanDetailsVisibility();
  updateMessageCounter();

  // runs every rule and keeps a running pass/fail flag - only true once everything's checked
  function validate() {
    let isFormValid = true;

    if (!applyFieldResult("name-field", "name-feedback", checkName())) isFormValid = false;
    if (!applyFieldResult("email-field", "email-feedback", checkEmail())) isFormValid = false;
    if (!applyFieldResult("phone-field", "phone-feedback", checkPhone(), { silentWhenEmpty: true })) isFormValid = false;
    if (!applyFieldResult("reason-field", "reason-feedback", checkReason())) isFormValid = false;
    if (!applyFieldResult("reply-method-field", "reply-method-feedback", checkReplyMethod())) isFormValid = false;
    if (!applyFieldResult("message-field", "message-feedback", checkMessage())) isFormValid = false;

    return isFormValid;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // no backend, we're not actually going anywhere

    if (!validate()) {
      formSuccess.hidden = true;
      // jump straight to whatever's broken first instead of making them hunt for it
      const firstInvalid = form.querySelector(".is-invalid input, .is-invalid select, .is-invalid textarea");
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    formSuccess.hidden = false;
    formSuccess.focus?.();
  });

  form.addEventListener("reset", () => {
    form.querySelectorAll(".field").forEach((field) => field.classList.remove("is-valid", "is-invalid"));
    form.querySelectorAll(".field-feedback").forEach((feedback) => {
      feedback.textContent = "";
      feedback.classList.remove("is-error", "is-success");
    });
    formSuccess.hidden = true;
    // the actual reset hasn't happened yet at this point in the event, so
    // wait a tick before re-reading the (now empty) fields
    setTimeout(() => {
      updateMessageCounter();
      updateScanDetailsVisibility();
    }, 0);
  });
});
