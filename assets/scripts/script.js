const birdData = window.birdsData;
let rightAnwserIndex = randomInteger(0, 5);
let isLVLPassed = false;

let isQuizPassed = Boolean(localStorage.getItem('isQuizPassed'));
if (isQuizPassed) {
  localStorage.setItem('quizStep', 0);
  document.location.href = 'result.html';
}

let balance = 5;

const scoreElem = document.querySelector('.header__score-count');
const breadCrumbsElem = document.querySelector('.bread-crumbs__list');
const answersElem = document.querySelector('.quiz__answers');
const optionsCollection = answersElem?.children;
const questionElem = document.querySelector('.question');
const descrElem = document.querySelector('.description');
const articleElem = document.querySelector('.article');
const nextBtnElem = document.querySelector('.quiz__next-btn');

const errorMessage = new Audio('./assets/sounds/error.mp3');
const winMessage = new Audio('./assets/sounds/win.mp3');

let quizStep = +localStorage.getItem('quizStep');
if (quizStep > 5) quizStep = 5;
let articleIndex = quizStep;
localStorage.setItem('quizStep', quizStep);

let score = +localStorage.getItem('score');
localStorage.setItem('score', score);
scoreElem.innerText = score;

class audioBlock {
  constructor(node, step) {

    this.element = node;
    this.audio = new Audio(birdData[step][rightAnwserIndex].audio);

    this.button = node.querySelector('.audioplayer__btn');

    this.volume = node.querySelector('.audioplayer__vol');
    this.volInrBtn = node.querySelector('.audioplayer__vol-btn--incr');
    this.volDecrBtn = node.querySelector('.audioplayer__vol-btn--decr');

    this.progressLine = node.querySelector('.audioplayer__progress');
    this.progressThumb = node.querySelector('.audioplayer__progress-thumb');

    this.duration = node.querySelector('.audioplayer__duration');
    this.currTime = node.querySelector('.audioplayer__curr-time');

    this.intervalId = null;

    this.audio.onpause = () => this.pause();

    this.audio.onended = () => {
      this.button.classList.add('audioplayer__btn--play');
      this.button.classList.remove('audioplayer__btn--stop');
    }

    this.button.onpointerup = () => {

      if (this.audio.paused) {
        this.play();
      } else {
        this.pause();
      }
    }

    this.volInrBtn.onpointerup = () => {
      let value = Math.round(this.audio.volume * 100) + 20;

      if (value >= 120) return;
      this.audio.volume = value/100;
      if (value >= 100) {
        this.volume.innerText = value;
      } else if (value >= 10) {
        this.volume.innerText = ` ${value}`;
      } else {
        this.volume.innerText = `  ${value}`;
      }
    }
    this.volDecrBtn.onpointerup = () => {
      let value = Math.round(this.audio.volume * 100) - 20;

      if (value <= -20) return;
      this.audio.volume = value/100;
      if (value >= 10) {
        this.volume.innerText = ` ${value}`;
      } else {
        this.volume.innerText = `   ${value}`;
      }
    }
  }

  update() {
    this.duration.innerText = getTimeCodeFromSec(this.audio.duration);
    this.currTime.innerText = getTimeCodeFromSec(this.audio.currentTime);
    this.progressLine.style.width = (this.audio.currentTime / this.audio.duration) * 100 + '%';
    this.progressThumb.style.left = `calc(${(this.audio.currentTime / this.audio.duration) * 100}% - 8px)`; 
  }
  play() {
    if (this.audio.paused) {
      this.audio.play();
      this.button.classList.remove('audioplayer__btn--play');
      this.button.classList.add('audioplayer__btn--stop');
      this.intervalId = setInterval( () => {
        this.update();
      }, 500);
    }

  }
  pause() {
    if (!this.audio.paused) {
      this.audio.pause();
      this.button.classList.add('audioplayer__btn--play');
      this.button.classList.remove('audioplayer__btn--stop');
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    }

  }
}

const question = {
  birdName: document.querySelector('.question__bird-name'),
  img: document.querySelector('.question__img'),
};
const article = {
  img: articleElem.querySelector('.article__img'),
  birdName: articleElem.querySelector('.article__name'),
  species: articleElem.querySelector('.article__species'),
  text: articleElem.querySelector('.article__text'),
};

const questionPlayer = new audioBlock(questionElem.querySelector('.audioplayer'), quizStep);
const articlePlayer = new audioBlock(articleElem.querySelector('.audioplayer'), articleIndex);

fillOptions(quizStep);
updateElements(quizStep);

function fillOptions(step) {
  if (!optionsCollection) return;
  for (let i = 0; i < optionsCollection.length; i++) {
    optionsCollection[i].innerText = birdsData[step][i].name;
  }
}

function clearAnswersMarks () {
  for (let option of optionsCollection) {
    option.classList.remove('answers__option--correct');
    option.classList.remove('answers__option--error');
  }
}

function updateElements(step) {
  questionPlayer.pause();
  questionPlayer.audio.onloadeddata = function() {
    questionPlayer.update();
  }
  breadCrumbsElem.querySelector('.bread-crumbs__elem--active')?.classList.remove("bread-crumbs__elem--active");
  breadCrumbsElem.children[step].classList.add("bread-crumbs__elem--active");
  questionPlayer.audio.src = birdsData[quizStep][rightAnwserIndex].audio;
}

function updatePlayer(player, index, src) {
  player.audio = new Audio(birdsData[articleIndex][index].audio);
  player.audio.onloadeddata = function() {
    player.update();
  }
}

nextBtnElem.onclick = function(event) {
  if (!isQuizPassed) {
    event.preventDefault();
  }

  if (isLVLPassed) {
    isLVLPassed = false;

    questionPlayer.currentTime = 0;

    question.img.src = 'assets/images/bird.jpg';
    question.birdName.innerText = '******';

    clearAnswersMarks();
    fillOptions(quizStep);
    updateElements(quizStep);

    descrElem.classList.remove('description--active');

    nextBtnElem.classList.remove('quiz__next-btn--active');
  }

  articleIndex = quizStep;
}


answersElem.onpointerup = function(event) {
  const option = event.target;
  if (!option.closest('.answers__option')) return;

  if (!isLVLPassed) {
    if (option.dataset.id == birdData[quizStep][rightAnwserIndex].id) {
      if (!errorMessage.paused) {
        errorMessage.pause();
      }
      if (winMessage.paused) {
        winMessage.play();
      } {
        winMessage.currentTime = 0;
      }
      

      option.classList.add('answers__option--correct');
      nextBtnElem.classList.add('quiz__next-btn--active');

      questionPlayer.pause();

      question.img.src = birdData[quizStep][rightAnwserIndex].image;
      question.birdName.innerText = birdData[quizStep][rightAnwserIndex].name;

      isLVLPassed = true;
      quizStep++;
      localStorage.setItem('quizStep', quizStep);
      if (quizStep > 5) {
        isQuizPassed = true;
        localStorage.setItem('isQuizPassed', '1');
      }

      score += balance;
      balance = 5;
      localStorage.setItem('score', score);
      scoreElem.innerText = score;

    } else if (!option.classList.contains("answers__option--error")) {
      if (!errorMessage.paused) {
        errorMessage.currentTime = 0;
      } else {
        errorMessage.play();
      }
      balance--;
      option.classList.add('answers__option--error');

    }
  }

  descrElem.classList.add('description--active');

  let index = option.dataset.id - 1;
  article.img.src = birdData[articleIndex][index].image;
  article.birdName.innerText = birdData[articleIndex][index].name;
  article.species.innerText = birdData[articleIndex][index].species;
  article.text.innerText = birdData[articleIndex][index].description;

  articlePlayer.pause();
  updatePlayer(articlePlayer, index, birdData[articleIndex][index].audio);
}

function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function getTimeCodeFromSec(num) {
  if (isNaN(num)) return '00:00';

  let min = parseInt(num / 60) + "";
  min = min.length < 2 ? '0' + min : min;
  let sec = parseInt(num - min * 60) + "";
  sec = sec.length < 2 ? '0' + sec : sec;
  return `${min}:${sec}`;
}