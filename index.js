// btn to create a new card
const addCard = document.querySelectorAll(".card_fieldAdd");

//modal
const modalWrapper = document.querySelector(".modalWrapper");
const form = document.querySelector("#form");
const submitBtn = document.querySelector(".subBtn");
const task = document.querySelector("#task");
const description = document.querySelector("#description");

//main wrapper
const wrapper = document.querySelector(".wrapper");
// const cardField = document.querySelector(".card_field");
const toDo = document.querySelector(".toDo");
const progress = document.querySelector(".inProgress");
const done = document.querySelector(".done");
const trash = document.querySelector(".deleted");

let data = [
  (todoArr = []),
  (progressArr = []),
  (doneArr = []),
  (trashArr = []),
];

addCard.forEach((adder) => {
  adder.addEventListener("click", function (event) {
    modalWrapper.classList.toggle("closeModal");
    event.preventDefault();
  });
});

form.addEventListener("submit", function (event) {
  modalWrapper.classList.toggle("closeModal");
  event.preventDefault();
  data[0].push({
    title: task.value,
    description: description.value,
  });
  drawACard(toDo, 0);
});

function drawACard(card, marker) {
  let desk = card.querySelector(".card_field");
  desk.innerHTML = "";
  data[marker].forEach((element) => {
    desk.innerHTML += `<div class="task">
    <h1 id="one">${element.title}</h1>
    <p id="two">${element.description}</p> 
    <div id="red"></div>
    <div id="del"></div>
    <div id="prog"></div>
    </div>
    `;
  });
}

wrapper.addEventListener("click", (event) => {
  const task = event.target.closest(".task");
  console.log(task);
  if (event.target === task.querySelector("#del")) {
    deleteACard(task);
    console.log("del");
  }
  if (event.target === task.querySelector("#red")) {
    console.log("red");
    reductACard(task);
  }
  if (event.target === task.querySelector("#prog")) {
    console.log("prog");
    cardInProgress(task);
  }
});

function deleteACard(card) {
  const cardTitle = card.querySelector("#one").textContent;
  data[numberOfDirictory(card)].forEach((element, index) => {
    if (element.title === cardTitle) {
      const curentCardValue = data[numberOfDirictory(card)].splice(index, 1);
      console.log(numberOfDirictory(card));
      data[3].push(curentCardValue[0]);
      drawACard(toDo, 0);
      drawACard(progress, 1);
      drawACard(done, 2);
      drawACard(trash, 3);
    }
  });
}

function reductACard(card) {
  modalWrapper.classList.toggle("closeModal");
  data[numberOfDirictory(card)].forEach((element, index) => {
    if (element.title === card.querySelector("#one").textContent) {
      task.value = element.title;
      description.value = element.description;
      data[numberOfDirictory(card)].splice(index, 1);
    }
  });
}

function cardInProgress(card) {
  const cardTitle = card.querySelector("#one").textContent;
  data[numberOfDirictory(card)].forEach((element, index) => {
    if (element.title === cardTitle) {
      const curentCardValue = data[numberOfDirictory(card)].splice(index, 1);
      data[numberOfDirictory(card) + 1].push(curentCardValue[0]);
      drawACard(toDo, 0);
      drawACard(progress, 1);
      drawACard(done, 2);
      drawACard(trash, 3);
    }
  });
}

function numberOfDirictory(unknown) {
  if (unknown.closest(".toDo") === toDo) {
    return 0;
  } else if (unknown.closest(".inProgress") === progress) {
    return 1;
  } else if (unknown.closest(".done") === done) {
    return 2;
  } else if (unknown.closest(".deleted") === trash) {
    return 3;
  }
}
