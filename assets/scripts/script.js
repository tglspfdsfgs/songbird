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
const placeHolderElem = document.querySelector('.description__placeholder');
const navList = [ document.querySelector('.nav__elem-1 .nav__link'),
                  document.querySelector('.nav__elem-2 .nav__link') ];

const langRuBtn = document.querySelector('.header__btn--ru');
const langEnBtn = document.querySelector('.header__btn--en');

const errorMessage = new Audio('./assets/sounds/error.mp3');
const winMessage = new Audio('./assets/sounds/win.mp3');

let quizStep = +localStorage.getItem('quizStep');
if (quizStep > 5) quizStep = 5;
let stepIndex = quizStep;
let articleIndex;
localStorage.setItem('quizStep', quizStep);

let score = +localStorage.getItem('score');
localStorage.setItem('score', score);
scoreElem.innerText = score;

let content = {
  en: {
    navList: ['Main', 'Quiz'],
    breadCrumbs: ['Warm-up', 'Sparrows', 'Forest Birds', 'Songbirds', 'Raptors', 'Seabirds'],
    placeHolder: 'Listen to the player.<br>Select a bird from the list',
  },
  ru: {
    navList: ['Главная', 'Викторина'],
    breadCrumbs: ['Разминка', 'Воробьиные', 'Лесные птицы', 'Певчие птицы', 'Хищные птицы', 'Морские птицы'],
    placeHolder: 'Послушайте плеер.<br>Выберите птицу из списка',
  }
}

let lang = localStorage.getItem('lang');
if (!lang) localStorage.setItem('lang', 'ru');
if (lang == 'en') {
  langRuBtn.classList.remove('header__btn--active');
  langEnBtn.classList.add('header__btn--active');
  changeLang();
}

class audioBlock {
  constructor(node, step) {
    let birdData = getData();
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

const questionPlayer = new audioBlock(questionElem.querySelector('.audioplayer'), stepIndex);
const articlePlayer = new audioBlock(articleElem.querySelector('.audioplayer'), stepIndex);

fillOptions(stepIndex);
updateElements(stepIndex);

function fillOptions(step) {
  if (!optionsCollection) return;
  let birdData = getData();
  for (let i = 0; i < optionsCollection.length; i++) {
    optionsCollection[i].innerText = birdData[step][i].name;
  }
}

function changeLang() {
  for (let i = 0; i < navList.length; i++) {
    navList[i].innerText = content[lang].navList[i];
  }
  for (let i = 0; i < breadCrumbsElem.children.length; i++) {
    breadCrumbsElem.children[i].innerHTML = content[lang].breadCrumbs[i];
  }
  placeHolderElem.innerHTML = content[lang].placeHolder;

  let data = getData();

  fillOptions(stepIndex, data);
  fillArticle(data, stepIndex, articleIndex);

  if (isLVLPassed) {
    question.birdName.innerText = data[stepIndex][rightAnwserIndex].name;
  }
} 

function clearAnswersMarks () {
  for (let option of optionsCollection) {
    option.classList.remove('answers__option--correct');
    option.classList.remove('answers__option--error');
  }
}

function updateElements(step) {
  let birdData = getData();
  questionPlayer.pause();
  questionPlayer.audio.onloadeddata = function() {
    questionPlayer.update();
  }
  breadCrumbsElem.querySelector('.bread-crumbs__elem--active')?.classList.remove("bread-crumbs__elem--active");
  breadCrumbsElem.children[step].classList.add("bread-crumbs__elem--active");
  questionPlayer.audio.src = birdData[stepIndex][rightAnwserIndex].audio;
}

function updatePlayer(player, index, src) {
  player.audio = new Audio(birdsData[stepIndex][index].audio);
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
    fillOptions(quizStep, birdsData);
    updateElements(quizStep);

    descrElem.classList.remove('description--active');

    nextBtnElem.classList.remove('quiz__next-btn--active');

    articlePlayer.pause();

    rightAnwserIndex = randomInteger(0, 5);
  }

  stepIndex = quizStep;
}

langEnBtn.onpointerup = function(event) {
  if (lang == 'en') return;

  localStorage.setItem('lang', 'en');
  lang = 'en';

  langRuBtn.classList.remove('header__btn--active');
  langEnBtn.classList.add('header__btn--active');
  changeLang();
}

langRuBtn.onpointerup = function(event) {
  if (lang == 'ru') return;

  localStorage.setItem('lang', 'ru');
  lang = 'ru';

  langEnBtn.classList.remove('header__btn--active');
  langRuBtn.classList.add('header__btn--active');
  changeLang();
}

answersElem.onpointerup = function(event) {
  const option = event.target;
  if (!option.closest('.answers__option')) return;

  let birdData = getData();

  if (!isLVLPassed) {
    if (option.dataset.id == birdData[stepIndex][rightAnwserIndex].id) {
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

      question.img.src = birdData[stepIndex][rightAnwserIndex].image;
      question.birdName.innerText = birdData[stepIndex][rightAnwserIndex].name;

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

  articleIndex = option.dataset.id - 1;

  fillArticle(birdData, stepIndex, articleIndex);

  articlePlayer.pause();
  updatePlayer(articlePlayer, articleIndex, birdData[stepIndex][articleIndex].audio);
}

function fillArticle(data, stepIndex, articleIndex) {
  if (articleIndex == undefined) return;

  article.img.src = data[stepIndex][articleIndex].image;
  article.birdName.innerText = data[stepIndex][articleIndex].name;
  article.species.innerText = data[stepIndex][articleIndex].species;
  article.text.innerText = data[stepIndex][articleIndex].description;
}

function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function getData() {
  if (localStorage.getItem('lang') == 'en') {
    return window.birdsDataEN;
  } else {
    return window.birdsData;
  }
}

function getTimeCodeFromSec(num) {
  if (isNaN(num)) return 'Loading';

  let min = parseInt(num / 60) + "";
  min = min.length < 2 ? '0' + min : min;
  let sec = parseInt(num - min * 60) + "";
  sec = sec.length < 2 ? '0' + sec : sec;
  return `${min}:${sec}`;
}