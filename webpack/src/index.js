import './styles.css';
import fetchCountries from './fetchCountries.js';
const debounce = require('lodash.debounce');

document.addEventListener('DOMContentLoaded', onReady);

let inp;

function onReady(e) {
  document.removeEventListener('DOMContentLoaded', onReady);
  inp = document.getElementById('input');

  const debounced=debounce(fetchCountries, 500);
  inp.addEventListener('input', debounced);
}