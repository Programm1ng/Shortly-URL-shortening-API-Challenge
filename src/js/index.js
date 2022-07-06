import '../css/style.css';
import Header from './modules/header';
import UrlShortener from './modules/url-shortener';
import urlShortenerApi from './modules/url-shortener-api';

const header = new Header();
const urlShortener = new UrlShortener(urlShortenerApi);