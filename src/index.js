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
console.log(refs);
refs.inputEl.addEventListener('input', debounce(onNameInput, DEBOUNCE_DELAY));

function onNameInput(event) {
  const name = refs.inputEl.value.trim();
  console.log(name);
  fetchCountries(name).then(countries => {
    refs.listEl.innerHTML = '';
    refs.countryInfoEl.innerHTML = '';
    if (countries.length === 1) {
      refs.countryInfoEl.innerHTML = creatMarkupInfo(countries);
    } else if (countries.length < 10) {
      refs.countryInfoEl.innerHTML = creatMarkupList(countries);
    }
  });
}
function creatMarkupInfo(countries) {
  const markupCountryInfo = countries
    .map(({ name, flags, capital, population, languages }) => {
      return `<li>
        <img src= "${flags.svg}" alt ="Flag of ${
        name.official
      }" width =40px higth = 60px />
        <p>${name.official}</p>
      </li>
      <li>
        <p>Capital:${capital}
</p>
      </li>
   <li>
        <p>Population:${population}
</p>
      </li>
      <li>
        <p>Languages:${Object.values(languages).join(', ')}
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
        <img src= "${flags.svg}" alt ="Flag of ${name.official}" width =40px higth = 60px />
        <p>${name.official}</p>
      </li>`;
    })
    .join('');
  return markupCountryList;
}
