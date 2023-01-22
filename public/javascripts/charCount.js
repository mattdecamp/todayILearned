/**
 * Count the characters and display the character count for the Today I Learned form textarea.
 * @param {String} text - textarea in TIL form
 * @param {String} charUsed - the number of characters used in textarea
 */

const text = document.querySelector("#tilBody")
const charUsed = document.querySelector(".charUsed")

function charCount() {
  const maxLength = text.getAttribute("maxlength");
  const currentLength = text.value.length;
  charUsed.innerHTML = currentLength
}

text.addEventListener("input", charCount)
