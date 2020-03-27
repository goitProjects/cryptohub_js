let conteiner = document.querySelector(".input-cryptocurrency");
let inputCurency = document.createElement("input");
let btnInput = document.createElement("a");
let names = [];
let ul = document.querySelector("#dropdown");
// class
inputCurency.classList.add("validate");
inputCurency.placeholder = "Enter currency name";
btnInput.classList.add("waves-effect", "waves-light", "btn", "cryptocurrency");
btnInput.textContent = "find cryptocurrency";
//append
conteiner.prepend(inputCurency);

function handlerChangeSearchInput(e, arr) {
  const searchArr = arr.filter(el =>
    el.name.toLowerCase().includes(e.target.value.toLowerCase())
  );
  createCardFromArr(searchArr);
}
