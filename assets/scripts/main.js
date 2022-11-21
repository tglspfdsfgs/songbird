const langRuBtn = document.querySelector('.header__btn--ru');
const langEnBtn = document.querySelector('.header__btn--en');

const navList = [ document.querySelector('.nav__elem-1 .nav__link'),
                  document.querySelector('.nav__elem-2 .nav__link') ];

const main = document.querySelector('.main');

content = {
  ru: {
    navList: ['Главная', 'Викторина'],
    main: `
        <p class="quiz__p3">Проверьте себя и узнайте, насколько вы хорошо узнаете птиц по их пению!</p>
        <h3 class="quiz__h3">Интересные факты: </h3>
        <ol class="quiz__list">
          <li><p>Известно, что у гениального композитора Вольфганга Амадея Моцарта был ручной скворец. Однажды Моцарт сыграл ему только что сочиненный фрагмент фортепианного концерта №21, а скворец воспроизвел его, при этом заменил в мелодии диезы на бемоли. Композитор в итоге записал вариант мелодии скворца</p>
          </li>
          <li><p>Птицы не рождаются со способность исполнять песни своей популяции. Так же, как и люди, они должны слушать пение взрослых особей, чтобы освоить его</p></li>
          <li><p>Большинство звуков, издаваемых птицами, мелодично для человеческого уха и оказало влияние на развитие музыки</p></li>
          <li><p>В большинстве случаев, когда вы слышите пение птиц, вероятней всего это самец. Самцы используют песню для привлечения сородичей и защиты своей родной территории</p></li>
        </ol>
        <a class="quiz__next-btn quiz__next-btn--active quiz__new-game-btn" href='quiz.html'>Играть!</a>
    `,
  },
  en: {
    navList: ['Main', 'Quiz'],
    main:`
        <p class="quiz__p3">Check yourself and see how well you recognize birds by their song!</p>
        <h3 class="quiz__h3">Interesting facts: </h3>
        <ol class="quiz_list">
          <li><p>It is known that the genius composer Wolfgang Amadeus Mozart had a tame starling. One day Mozart played him a fragment of Piano Concerto No. 21 he had just composed, and the starling reproduced it, while replacing sharps with flats in the melody. The composer eventually recorded a version of the starling melody</p>
          </li>
          <li><p>Birds are not born with the ability to sing the songs of their population. Just like humans, they must listen to the singing of adults in order to master it</p></li>
          <li><p>Most of the sounds made by birds are melodic to the human ear and have influenced the development of music</p></li>
          <li><p>Most of the time, when you hear a bird singing, it's most likely a male. Males use song to attract relatives and protect their home territory</p></li>
        </ol>
        <a class="quiz__next-btn quiz__next-btn--active quiz__new-game-btn" href='quiz.html'>Play!</a>
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
  main.innerHTML = content[lang].main;
}