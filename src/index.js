import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import { fetchCountries } from './js/fetch-countries';
const DEBOUNCE_DELAY = 300;
const refs = {
  inputEl: document.querySelector('#search-box'),
  listEl: document.querySelector('.country-list'),
  countryInfoEl: document.querySelector('.country-info'),
};

refs.inputEl.addEventListener('input', debounce(onNameInput, DEBOUNCE_DELAY));

function onNameInput(event) {
  event.preventDefault();
  const name = refs.inputEl.value.trim();
  if (name === '') {
    return (refs.listEl.innerHTML = ''), (refs.countryInfoEl.innerHTML = '');
  }
  console.log(name);
  fetchCountries(name)
    .then(countries => {
      refs.listEl.innerHTML = '';
      refs.countryInfoEl.innerHTML = '';
      if (countries.length === 1) {
        refs.countryInfoEl.innerHTML = creatMarkupInfo(countries);
      } else if (countries.length < 10) {
        refs.listEl.innerHTML = creatMarkupList(countries);
      } else {
        alertTooManyMatches();
      }
    })
    .catch(alertWrongName);
}
function creatMarkupInfo(countries) {
  const markupCountryInfo = countries
    .map(({ name, flags, capital, population, languages }) => {
      return `<li>
        <img src= "${flags.svg}" alt ="Flag of ${
        name.official
      }" width =30px height =30px />
        <p><b>${name.official}</b></p>
      </li>
      <li>
        <p><b>Capital:</b>${capital}
</p>
      </li>
   <li>
        <p><b>Population:</b>${population}
</p>
      </li>
      <li>
        <p><b>Languages:</b>${Object.values(languages).join(', ')}
</p>
      </li>
     `;
    })
    .join('');
  return markupCountryInfo;
}
function creatMarkupList(countries) {
  const markupCountryList = countries
    .map(({ name, flags }) => {
      return `<li>
        <img src= "${flags.svg}" alt ="Flag of ${name.official}" width =30px height = 30px />
        <p>${name.official}</p>
      </li>`;
    })
    .join('');
  return markupCountryList;
}
function alertWrongName() {
  Notify.failure('Oops, there is no country with that name');
}

function alertTooManyMatches() {
  Notify.info('Too many matches found. Please enter a more specific name.');
}
