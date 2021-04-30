class ContentQuistion {
  constructor() {
    this.element = document.getElementById("quistion-content");
  }

  hide() {
    this.element.classList.add("c-quiz__body--opacity");
  }

  show() {
    this.element.classList.remove("c-quiz__body--opacity");
  }
}

const answers = document.querySelectorAll("[name='answer']");
const answers__label = document.querySelectorAll(".c-quiz__label");
const quistion_ = document.getElementById("quistion");

// quistion
const current__quistion = document.getElementById("current");
const length__quistion = document.getElementById("length");

// current quistions
let current = 0;
// body quistion
const content_quistions = new ContentQuistion();

let Quistions = null;

// init
async function init() {
  const { quistions } = await fetch("./quistions.json").then((data) =>
    data.json()
  );

  const { quistion, answers } = quistions[current];
  // set label answers
  setInformation(quistion, answers, current);

  content_quistions.show();

  // length quistion
  length__quistion.innerHTML = quistions.length;

  Quistions = quistions;
}

init();

function setInformation(quistion, answers, current) {
  quistion_.innerHTML = `${current + 1}.${quistion}`;

  // set answers
  answers.forEach((answer, index) => {
    answers__label[index].innerHTML = answer;
  });

  current__quistion.innerHTML = current + 1;
}

/* --------------------- section choose answer ----------------- */

class CompleteButton {
  constructor() {
    this.element = document.getElementById("next");
  }

  stop() {
    this.element.disabled = true;
  }

  open() {
    this.element.disabled = false;
  }

  result() {
    this.element.innerHTML = "see result";
    this.element.onclick = result;
  }


}

const button = new CompleteButton();
const answers_user = [];

answers.forEach((answer) => {
  answer.addEventListener("change", answerChoosen);
});

function answerChoosen() {
  // set answer choosen
  answers_user[current] = {
    current: current + 1,
    answer: this.value,
  };

  // open disabled
  button.open();
}

function nextQuistion() {
  current += 1;

  content_quistions.hide();

  button.stop();

  answers.forEach((answer) => (answer.checked = false));

  setTimeout(() => {
    const { quistion, answers } = Quistions[current];
    // set label answers
    setInformation(quistion, answers, current);

    content_quistions.show();
  }, 1000);

  if (current + 1 === Quistions.length) {
    button.result();
  }
}

let mark_of_solution = 0;

function result() {
  for (let i = 0; i < Quistions.length; i++) {
    if (Quistions[i].solution === answers_user[i].answer) {
      mark_of_solution += 1;
    }
  }

  content_quistions.hide();

  setTimeout(() => {
    content_quistions.element.innerHTML = `
        <h4 class="title-mark">you are finished the exam and your mark is </h4>
        <p class="mark">
            <span class="mark_">${mark_of_solution}</span> of 
            <span class="quistion">${Quistions.length}</span>
        </p>
        `;

    content_quistions.show();

  }, 1000);
} 

