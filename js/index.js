'use strict';
const lang = window.navigator.language,
  d = window.document;
let allTexts = null,
  texts = null;

const $lang = d.getElementById('lang'),
  $toggleLang = d.getElementById('toggleLang'),
  $theme = d.getElementById('theme'),
  $toggleTheme = d.getElementById('toggleTheme'),
  $profession = d.getElementById('profession'),
  $greet = d.getElementById('greet'),
  $i = d.getElementById('i'),
  $aboutMe = d.getElementById('aboutMe'),
  $me = d.getElementById('me'),
  $copyright = d.getElementById('copyright');

d.addEventListener('DOMContentLoaded', () => {
  setContents();
  eventListeners();
});

const setContents = async () => {
  const res = await fetch('../json/index.json');
  allTexts = await res.json();

  lang.startsWith('es') ? (texts = allTexts.es) : (texts = allTexts.en);

  const theme = localStorage.getItem('key');

  $theme.textContent = theme === 'dark' ? '🌙' : '☀️';

  let html = '';
  const last = texts.me.length - 1;
  texts.me.forEach((item, i) => {
    if (i === last) html += `<p class='details-last'>${item}</p>`;
    else html += `<p>${item}</p>`;
  });

  $lang.innerHTML = `<img src="./img/flag-${texts.lang}.png" alt="flag">`;
  $profession.textContent = texts.profession;
  $greet.textContent = texts.greet;
  $i.textContent = texts.i;
  $aboutMe.textContent = texts.aboutMe;
  $me.innerHTML = html;
  $copyright.textContent = texts.copyright;
};

const eventListeners = () => {
  $toggleLang.addEventListener('click', handleLang);
  $toggleTheme.addEventListener('click', handleTheme);
};

const handleLang = async () => {
  texts.lang === 'es' ? (texts = allTexts.en) : (texts = allTexts.es);
  console.log('toggle lang...');
};

const handleTheme = () => {
  console.log('toggle theme...');
};
