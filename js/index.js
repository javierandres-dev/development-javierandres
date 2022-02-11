'use strict';
const lang = window.navigator.language,
  d = window.document;
let texts = null;

const $profession = d.getElementById('profession'),
  $greet = d.getElementById('greet'),
  $i = d.getElementById('i'),
  $aboutMe = d.getElementById('aboutMe'),
  $me = d.getElementById('me'),
  $copyright = d.getElementById('copyright');

d.addEventListener('DOMContentLoaded', () => {
  setTexts();
});

const setTexts = async () => {
  let res = await fetch('../json/index.json');
  res = await res.json();
  lang.startsWith('es') ? (texts = res.es) : (texts = res.en);

  let html = '';
  texts.me.forEach((item) => {
    html += `<p>${item}</p>`;
  });

  $profession.textContent = texts.profession;
  $greet.textContent = texts.greet;
  $i.textContent = texts.i;
  $aboutMe.textContent = texts.aboutMe;
  $me.innerHTML = html;
  $copyright.textContent = texts.copyright;
};
