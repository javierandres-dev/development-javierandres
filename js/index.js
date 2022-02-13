'use strict';
const lang = window.navigator.language,
  d = window.document;
let allTexts = null,
  texts = null,
  theme = 'light',
  oppositeTheme = 'dark';

const $body = d.querySelector('body'),
  $footer = d.querySelector('footer'),
  $logo = d.getElementById('logo'),
  $btnLang = d.getElementById('btnLang'),
  $btnTheme = d.getElementById('btnTheme'),
  $profession = d.getElementById('profession'),
  $greet = d.getElementById('greet'),
  $i = d.getElementById('i'),
  $aboutMe = d.getElementById('aboutMe'),
  $me = d.getElementById('me'),
  $copyright = d.getElementById('copyright');

d.addEventListener('DOMContentLoaded', () => {
  setInitialContents();
  eventListeners();
});

const setInitialContents = async () => {
  const res = await fetch('../json/index.json');
  allTexts = await res.json();

  lang.startsWith('es') ? (texts = allTexts.es) : (texts = allTexts.en);

  setContents();
};

const setContents = () => {
  let html = '';
  const last = texts.me.length - 1;
  texts.me.forEach((item, i) => {
    if (i === last) html += `<p class='details-last'>${item}</p>`;
    else html += `<p>${item}</p>`;
  });

  $logo.setAttribute('src', `./img/logo-${oppositeTheme}.svg`);
  $btnLang.innerHTML = `<img src="./img/flag-${texts.oppositeLang}.png" alt="flag" class='btn-flag'>`;
  $btnTheme.textContent = theme === 'light' ? '🌙' : '☀️';
  $profession.textContent = texts.profession;
  $greet.textContent = texts.greet;
  $i.textContent = texts.i;
  $aboutMe.textContent = texts.aboutMe;
  $me.innerHTML = html;
  $copyright.textContent = texts.copyright;
};

const eventListeners = () => {
  $btnLang.addEventListener('click', toggleLang);
  $btnTheme.addEventListener('click', toggleTheme);
};

const toggleLang = async () => {
  texts.lang === 'es' ? (texts = allTexts.en) : (texts = allTexts.es);
  setContents();
};

const toggleTheme = () => {
  theme === 'light'
    ? ((theme = 'dark'), (oppositeTheme = 'light'))
    : ((theme = 'light'), (oppositeTheme = 'dark'));
  $btnTheme.textContent = theme === 'light' ? '🌙' : '☀️';
  $body.classList.toggle('dark');
  $footer.classList.toggle('dark');
  $logo.setAttribute('src', `./img/logo-${oppositeTheme}.svg`);
};
