//modal
const addCard = document.querySelectorAll(".card_fieldAdd");
const submitBtn = document.querySelector(".subBtn");
const modalWrapper = document.querySelector(".modalWrapper");
const form = document.querySelector("#form");
const task = document.querySelector("#task");
const description = document.querySelector("#description");
const cardField = document.querySelector(".card_field");
let adding = "";
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
  saveInfo(task, description);
  console.log(data);
  write();
});

function saveInfo(title, desc) {
  let obj = {
    title: title.value,
    description: desc.value,
  };
  data.push(obj);
}

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

cardField.addEventListener("click", (event) => {
  const del = event.target.querySelector("#del");
  if (event.target.closest("#del")) {
    const board = event.target.closest(".bk");
    const titleText = board.querySelector("#one");
    const titleVal = titleText.innerHTML;
    clearBoard(titleVal, board);
  }
});
function clearBoard(val, brd) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].title == val) {
      data.splice(i, 1);
      brd.innerHTML = "";
    }
  }
}

cardField.addEventListener("click", (event) => {
  const red = event.target.querySelector("#red");
  if (event.target.closest("#red")) {
    const board = event.target.closest(".bk");
    const titleText = board.querySelector("#one");
    const titleVal = titleText.innerHTML;
    const reductText = board.querySelector("#two");
    const descVal = reductText.innerHTML;
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
    for (let i = 0; i < data.length; i++) {
      if (data[i].description == d) {
        data.splice(i, 1);
      }
    }
  });
}
