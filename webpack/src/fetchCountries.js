import PNotify from '../node_modules/pnotify/dist/es/PNotify.js';
import PNotifyBrightTheme from '../node_modules/pnotify/dist/PNotifyBrightTheme.css';

import countryItem from './templates/country-item.hbs';
const baseUrl = 'https://restcountries.eu/rest/v2/name/';

let timerId;
let inp;
let result;
const debounce = require('lodash.debounce');

inp = document.getElementById('input');

const countriesList = document.querySelector('.article-list');

function fetchCountries(searchQuery) {
  result = baseUrl + inp.value;
  clearTimeout(timerId);

  countriesList.innerHTML = '';
  timerId = fetch(result)
    .then(resp => {
      return resp.json();
    })
    .then(data => {
      countriesList.innerHTML = '';
      if (data.length > 10) {
        PNotify.notice('Too many matches found!');
        return;
      }

      if (data.length === 1) {
        insertItems(createListMarkup(data));
      }

      if (data.length <= 10) {
        data.forEach(elem => {
          data.length = 10;
          countriesList.insertAdjacentHTML(
            'beforeend',
            `<li>${elem.name}</li>`,
          );
        });
      } else {
        data.forEach(elem => {
          countriesList.insertAdjacentHTML(
            'beforeend',
            `<li>${elem.name}</li>`,
          );
        });
      }
    })

    .catch(e => {
      console.log(e);
    });
  PNotify.closeAll();
}

function insertItems(items) {
  countriesList.insertAdjacentHTML('beforeend', items);
}

function createListMarkup(items) {
  return countryItem(items);
}

export default fetchCountries;
