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
  cardField.innerHTML = "";
  data.forEach((element) => {
    cardField.innerHTML += `<div class="bk">
    <h1 id="one">${element.title}</h1>
    <p id="two">${element.description}</p> 
    <div id="red"></div>
    <div id="del"><div>
    </div>
    `;
  });
}
//   const first = cardField.firstChild;
//   cardField.insertBefore(newDiv, first);
// }

function clearBoard(val, brd) {
  data.forEach((elemetn, index) => {
    if (elemetn.title === val) {
      data.splice(index, 1);
      brd.innerHTML = "";
      write();
    }
  });
}

cardField.addEventListener("click", (event) => {
  const board = event.target.closest(".bk");
  const titleText = board.querySelector("#one").textContent;
  const reductText = board.querySelector("#two").textContent;
  console.log(reductText);
  if (event.target.closest("#del")) {
    clearBoard(titleText, cardField);
  } else if (event.target.closest("#red")) {
    cardField.innerHTML = "";
    reductBoard(titleText, reductText);
  }
});

function reductBoard(t, d) {
  modalWrapper.classList.toggle("closeModal");
  task.value = t;
  description.value = d;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    data.forEach((element, index) => {
      if (element.description == d) {
        data.splice(index, 1);
        write();
      }
    });
  });
}
