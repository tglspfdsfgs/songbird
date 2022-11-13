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
  document.location.href = 'quiz.html';
}