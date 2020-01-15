import './styles.css';
import fetchCountries from './fetchCountries.js';
import countryItem from './templates/country-item.hbs';
import PNotify from '../node_modules/pnotify/dist/es/PNotify.js';
import PNotifyBrightTheme from '../node_modules/pnotify/dist/PNotifyBrightTheme.css';

const baseUrl = 'https://restcountries.eu/rest/v2/name/';

const debounce = require('lodash.debounce');

let result;
let timerId;

const countriesList = document.querySelector('.article-list');
let inp = document.getElementById('input');

const debounced = debounce(onData, 500);
inp.addEventListener('input', debounced);

function onData() {
  const inpValue = inp.value;
  if (inpValue === "") {
    clearOutput();
    return;
  }

  fetchCountries(baseUrl, inpValue, onDataReady);
}

function onDataReady(data) {
  clearOutput();
  if (data.length >= 10) {
    notificationOnManyMatches();
  } else if (data.length > 1) {
    showCountryList(data);
  } else {
    showCountryDetails(data);
  }

  PNotify.closeAll();
}

function notificationOnManyMatches() {
  PNotify.error('Too many matches found! Please enter a more specific query!');
}

function showCountryList(countryList) {
  const itm = countryList.reduce(
    (acc, item) => (acc += `<li>${item.name}</li>`),
    '',
  );
  countriesList.insertAdjacentHTML('beforeend', itm);
}

function showCountryDetails(cntry) {
  insertItems(createListMarkup(cntry));
}

function insertItems(items) {
  countriesList.insertAdjacentHTML('beforeend', items);
}

function createListMarkup(items) {
  return countryItem(items);
}

function clearOutput() {
  countriesList.innerHTML = '';
}