const container = document.querySelector(".ingredientSec");
const addBtn = document.getElementById("add-btn");

addBtn.addEventListener("click", function () {
    const firstIngredient = document.querySelector(".ingredient");
    const clone = firstIngredient.cloneNode(true);

    const inputs = clone.querySelectorAll("input");
    inputs.forEach(input => input.value = "");

    container.insertBefore(clone, addBtn);
});

let Recipeimg = document.getElementById("Recipeimg");
let input = document.getElementById("inputimg");

input.onchange = function(){
    Recipeimg.src = URL.createObjectURL(inputimg.files[0])
}