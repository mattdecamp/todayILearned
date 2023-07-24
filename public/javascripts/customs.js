/**
 * Count the characters and display the character count for the Today I Learned form textarea.
 * @param {String} text - textarea in TIL form
 * @param {String} charUsed - the number of characters used in textarea
 */

const text = document.querySelector("#tilBody");
const charUsed = document.querySelector(".charUsed");

function charCount() {
  const maxLength = text.getAttribute("maxlength");
  const currentLength = text.value.length;
  charUsed.innerHTML = currentLength;
}
if (text != null) {
  text.addEventListener("input", charCount);
}

/**
 * Close flash messages when `x` button is clicked
 * @param {Object} flashButton - Flash message button
 * @param {Function} closeFlash - function called that closes the flash dialog
 */

let flashButtons = document.querySelectorAll(".flash__remove");

if (flashButtons != null) {
  flashButtons.forEach(button => button.addEventListener("click", closeFlash));
}

function closeFlash() {
  this.parentElement.remove();
}
