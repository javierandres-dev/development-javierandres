'use strict';
const lang = window.navigator.language,
  d = window.document;
let allTexts = null,
  texts = null,
  theme = 'light';

const $body = d.querySelector('body'),
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

const setContents = () => {
  let html = '';
  const last = texts.me.length - 1;
  texts.me.forEach((item, i) => {
    if (i === last) html += `<p class='details-last'>${item}</p>`;
    else html += `<p>${item}</p>`;
  });

  $logo.setAttribute('src', './img/logo-dark.svg');
  $btnLang.innerHTML = `<img src="./img/flag-${texts.lang}.png" alt="flag">`;
  $btnTheme.textContent = theme === 'light' ? '☀️' : '🌙';
  $profession.textContent = texts.profession;
  $greet.textContent = texts.greet;
  $i.textContent = texts.i;
  $aboutMe.textContent = texts.aboutMe;
  $me.innerHTML = html;
  $copyright.textContent = texts.copyright;
};

const setInitialContents = async () => {
  const res = await fetch('../json/index.json');
  allTexts = await res.json();

  lang.startsWith('es') ? (texts = allTexts.es) : (texts = allTexts.en);

  setContents();
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
  theme === 'light' ? (theme = 'dark') : (theme = 'light');
  $btnTheme.textContent = theme === 'light' ? '☀️' : '🌙';
  $body.classList.toggle('dark');
  $logo.setAttribute('src', `./img/logo-${theme}.svg`);
};
