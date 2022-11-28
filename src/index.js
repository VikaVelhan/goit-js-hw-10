import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import { fetchCountries } from './js/fetch-countries';
const DEBOUNCE_DELAY = 300;
