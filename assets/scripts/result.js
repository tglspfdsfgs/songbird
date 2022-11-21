let quizStep = +localStorage.getItem('quizStep');
if (quizStep > 5) quizStep = 5;
localStorage.setItem('quizStep', quizStep);

const scoreElem = document.querySelector('.header__score-count');
const scoreResultElem = document.querySelector('.quiz__score--result');
let score = +localStorage.getItem('score');
localStorage.setItem('score', score);
scoreElem.innerText = score;
scoreResultElem.innerText = score;
let isQuizPassed = Boolean(localStorage.getItem('isQuizPassed'));

if (score >= 30) {
  document.querySelector('.quiz__p1--try-again').hidden = true;
  document.querySelector('.quiz__p1--win').hidden = false;

  document.querySelector('.quiz__btn-sign-try-again').hidden = false;
  document.querySelector('.quiz__new-game-btn-try-again').hidden = true;
}

if (isQuizPassed) {
  localStorage.setItem('isQuizPassed', '');
  localStorage.setItem('quizStep', 0);
  localStorage.setItem('score', 0);
} else {
  document.location.href = 'index.html';
}

const langRuBtn = document.querySelector('.header__btn--ru');
const langEnBtn = document.querySelector('.header__btn--en');

const navList = [ document.querySelector('.nav__elem-1 .nav__link'),
                  document.querySelector('.nav__elem-2 .nav__link') ];

const breadCrumbsElem = document.querySelector('.bread-crumbs__list');

const congrats = document.querySelector('.quiz__congrats');

content = {
  ru: {
    navList: ['Главная', 'Викторина'],
    breadCrumbs: ['Разминка', 'Воробьиные', 'Лесные птицы', 'Певчие птицы', 'Хищные птицы', 'Морские птицы'],
    congrats: `
          <h3 class="quiz__h1">Поздравляем!</h3>
          <p class="quiz__p1 quiz__p1--try-again">Вы прошли викторину и набрали <span class="quiz__score quiz__score--result">${score}</span> из <span class="quiz__score">30</span> возможных баллов</p>
          <p class="quiz__p1 quiz__p1--win" hidden>Вы прошли викторину и набрали максимальное колличество возможных баллов</p>
          <a class="quiz__next-btn quiz__next-btn--active quiz__new-game-btn" href='quiz.html'><span class="quiz__new-game-btn-try-again">Попробовать еще раз!</span><span class="quiz__btn-sign-try-again" hidden>Новая игра</span> </a>
    `,
  },
  en: {
    navList: ['Main', 'Quiz'],
    breadCrumbs: ['Warm-up', 'Sparrows', 'Forest Birds', 'Songbirds', 'Raptors', 'Seabirds'],
    congrats:`
         <h3 class="quiz__h1">Congratulations!</h3>
         <p class="quiz__p1 quiz__p1--try-again">You completed the quiz and scored <span class="quiz__score quiz__score--result">${score}</span> of <span class="quiz__score">30</span> possible points</p>
         <p class="quiz__p1 quiz__p1--win" hidden>You have completed the quiz and scored the maximum possible score</p>
         <a class="quiz__next-btn quiz__next-btn--active quiz__new-game-btn" href='quiz.html'><span class="quiz__new-game-btn-try-again">Try again!</ span><span class="quiz__btn-sign-try-again" hidden>New game</span> </a>
    `,
  }
}

let lang = localStorage.getItem('lang');
if (!lang) localStorage.setItem('lang', 'ru');
if (lang == 'en') {
  langRuBtn.classList.remove('header__btn--active');
  langEnBtn.classList.add('header__btn--active');
  changeLang();
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

function changeLang() {
  for (let i = 0; i < navList.length; i++) {
    navList[i].innerText = content[lang].navList[i];
  }

  for (let i = 0; i < breadCrumbsElem.children.length; i++) {
    breadCrumbsElem.children[i].innerHTML = content[lang].breadCrumbs[i];
  }

  congrats.innerHTML = content[lang].congrats;

  if (score >= 30) {
    document.querySelector('.quiz__p1--try-again').hidden = true;
    document.querySelector('.quiz__p1--win').hidden = false;

    document.querySelector('.quiz__btn-sign-try-again').hidden = false;
    document.querySelector('.quiz__new-game-btn-try-again').hidden = true;
  }
}