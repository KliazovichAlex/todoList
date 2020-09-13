//modal
const addCard = document.querySelectorAll(".card_fieldAdd");
const submitBtn = document.querySelector(".subBtn");
const modalWrapper = document.querySelector(".modalWrapper");
const form = document.querySelector("#form");
const task = document.querySelector("#task");
const description = document.querySelector("#description");
const cardField = document.querySelector(".card_field");
let data = [];

addCard.forEach((adder) => {
  adder.addEventListener("click", function (event) {
    modalWrapper.classList.toggle("closeModal");
    event.preventDefault();
  });
});

form.addEventListener("submit", function (event) {
  modalWrapper.classList.toggle("closeModal");
  event.preventDefault();
  data.push({
    title: task.value,
    description: description.value,
  });
  console.log(data);
  write();
});

function write() {
  const newDiv = document.createElement("div");
  newDiv.classList.add("bk");
  newDiv.innerHTML = "";
  data.forEach((element) => {
    newDiv.innerHTML = `
    <h1 id="one">${element.title}</h1>
    <p id="two">${element.description}</p> 
    <div id="red"></div>
    <div id="del"><div>
    `;
  });
  const first = cardField.firstChild;
  cardField.insertBefore(newDiv, first);
}

function clearBoard(val, brd) {
  while (cardField.firstChild) {
    cardField.removeChild(cardField.lastChild);
  }
  data.forEach((elemetn) => {
    if (elemetn.title === val) {
      let idx = data.indexOf(val);
      data.splice(idx, 1);
      brd.innerHTML = "";
      write();
    }
  });
}

cardField.addEventListener("click", (event) => {
  const red = event.target.querySelector("#red");
  const del = event.target.querySelector("#del");
  const board = event.target.closest(".bk");
  const titleText = board.querySelector("#one");
  const titleVal = titleText.innerHTML;
  const reductText = board.querySelector("#two");
  const descVal = reductText.innerHTML;
  if (event.target.closest("#del")) {
    clearBoard(titleVal, board);
  } else if (event.target.closest("#red")) {
    board.innerHTML = "";
    reductBoard(titleVal, descVal, board);
  }
});

function reductBoard(t, d, brd) {
  modalWrapper.classList.toggle("closeModal");
  task.value = t;
  description.value = d;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    data.forEach((element) => {
      if (element.description == d) {
        let indx = data.indexOf(element);
        data.splice(indx, 1);
        brd.innerHTML = "";
      }
    });
  });
}
