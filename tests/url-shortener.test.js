import UrlShortener from "../src/js/modules/url-shortener";
import urlShortenerApi from "../src/js/modules/url-shortener-api";
jest.mock('../src/js/modules/url-shortener-api');

describe('Testing api error message handling', () => {

  beforeEach(() => {
    document.body.innerHTML = `
      <form id="url-shortener-form"></form>
      <input id="url-shortener-input"/>
      <button id="url-shortener-button"></button>
      <div id="url-shortener-wrapper"></div>
      <section id="url-shortener-section"></section>
    `;
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should show the error message "No URL specified."', () => {
    const mockData = {
      "ok": false,
      "error_code": 1,
      "error": "No URL specified."
    };

    let urlShortener = new UrlShortener(urlShortenerApi);
    urlShortener.handleResponse(mockData);

    const wrapper = document.getElementById('url-shortener-wrapper');
    expect(wrapper.innerHTML).toContain('No URL specified.');
  });

  test('should show the error message "Invalid URL submitted."', () => {
    const mockData = {
      "ok": false,
      "error_code": 2,
      "error": "Invalid URL submitted."
    };

    let urlShortener = new UrlShortener(urlShortenerApi);
    urlShortener.handleResponse(mockData);

    const wrapper = document.getElementById('url-shortener-wrapper');
    expect(wrapper.innerHTML).toContain('Invalid URL submitted.');
  });

  test('should show the error message "Rate limit reached. Wait a second and try again."', () => {
    const mockData = {
      "ok": false,
      "error_code": 3,
      "error": "Rate limit reached. Wait a second and try again."
    };

    let urlShortener = new UrlShortener(urlShortenerApi);
    urlShortener.handleResponse(mockData);

    const wrapper = document.getElementById('url-shortener-wrapper');
    expect(wrapper.innerHTML).toContain('Rate limit reached. Wait a second and try again.');
  });

  test('should show the error message "IP-Address has been blocked."', () => {
    const mockData = {
      "ok": false,
      "error_code": 4,
      "error": "IP-Address has been blocked."
    };

    let urlShortener = new UrlShortener(urlShortenerApi);
    urlShortener.handleResponse(mockData);

    const wrapper = document.getElementById('url-shortener-wrapper');
    expect(wrapper.innerHTML).toContain('IP-Address has been blocked.');
  });

  test('should show the error message "Shortcode slug is already taken / in use."', () => {
    const mockData = {
      "ok": false,
      "error_code": 5,
      "error": "Shortcode slug is already taken / in use."
    };

    let urlShortener = new UrlShortener(urlShortenerApi);
    urlShortener.handleResponse(mockData);

    const wrapper = document.getElementById('url-shortener-wrapper');
    expect(wrapper.innerHTML).toContain('Shortcode slug is already taken / in use.');
  });

  test('should show the error message "Shortcode slug is already taken / in use."', () => {
    const mockData = {
      "ok": false,
      "error_code": 6,
      "error": "Unknown error"
    };

    let urlShortener = new UrlShortener(urlShortenerApi);
    urlShortener.handleResponse(mockData);

    const wrapper = document.getElementById('url-shortener-wrapper');
    expect(wrapper.innerHTML).toContain('Unknown error, please try again later.');
  });

  test('should show the error message "Shortcode slug is already taken / in use."', () => {
    const mockData = {
      "ok": false,
      "error_code": 7,
      "error": "No code specified (\"code\" parameter is empty)"
    };

    let urlShortener = new UrlShortener(urlShortenerApi);
    urlShortener.handleResponse(mockData);

    const wrapper = document.getElementById('url-shortener-wrapper');
    expect(wrapper.innerHTML).toContain('Unknown error, please try again later.');
  });

  test('should show the error message "Shortcode slug is already taken / in use."', () => {
    const mockData = {
      "ok": false,
      "error_code": 8,
      "error": "Invalid code submitted (code not found/there is no such short-link)"
    };

    let urlShortener = new UrlShortener(urlShortenerApi);
    urlShortener.handleResponse(mockData);

    const wrapper = document.getElementById('url-shortener-wrapper');
    expect(wrapper.innerHTML).toContain('Unknown error, please try again later.');
  });

  test('should show the error message "Shortcode slug is already taken / in use."', () => {
    const mockData = {
      "ok": false,
      "error_code": 9,
      "error": "Missing required parameters"
    };

    let urlShortener = new UrlShortener(urlShortenerApi);
    urlShortener.handleResponse(mockData);

    const wrapper = document.getElementById('url-shortener-wrapper');
    expect(wrapper.innerHTML).toContain('Unknown error, please try again later.');
  });

  test('should show the error message "Trying to shorten a disallowed link."', () => {
    const mockData = {
      "ok": false,
      "error_code": 10,
      "error": "Trying to shorten a disallowed link."
    };

    let urlShortener = new UrlShortener(urlShortenerApi);
    urlShortener.handleResponse(mockData);

    const wrapper = document.getElementById('url-shortener-wrapper');
    expect(wrapper.innerHTML).toContain('Trying to shorten a disallowed link.');
  });

});

describe('Testing handleButtonClick error message handling', () => {

  beforeEach(() => {
    document.body.innerHTML = `
      <form id="url-shortener-form"></form>
      <input id="url-shortener-input"/>
      <button id="url-shortener-button"></button>
      <div id="url-shortener-wrapper"></div>
      <section id="url-shortener-section"></section>
    `;
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should show the error message "No URL specified."', async () => {
    const wrapper = document.getElementById('url-shortener-wrapper');
    const input = document.getElementById('url-shortener-input');

    const urlShortener = new UrlShortener();
    await urlShortener.handleButtonClick();

    expect(wrapper.innerHTML).toContain('No URL specified.');
  });

  test('should show the error message "Invalid URL submitted."', async () => {
    const wrapper = document.getElementById('url-shortener-wrapper');
    const input = document.getElementById('url-shortener-input');
    input.value = "htt://www.google.de";

    const urlShortener = new UrlShortener();
    await urlShortener.handleButtonClick();

    expect(wrapper.innerHTML).toContain('Invalid URL submitted.');
  });

  test('should show the error message "Invalid URL submitted."', async () => {
    const wrapper = document.getElementById('url-shortener-wrapper');
    const input = document.getElementById('url-shortener-input');
    input.value = "https:/www.google.de";

    const urlShortener = new UrlShortener();
    await urlShortener.handleButtonClick();

    expect(wrapper.innerHTML).toContain('Invalid URL submitted.');
  });

  test('should show the error message "Invalid URL submitted."', async () => {
    const wrapper = document.getElementById('url-shortener-wrapper');
    const input = document.getElementById('url-shortener-input');
    input.value = "https:///www.google.de";

    const urlShortener = new UrlShortener();
    await urlShortener.handleButtonClick();

    expect(wrapper.innerHTML).toContain('Invalid URL submitted.');
  });

  test('should show the error message "Invalid URL submitted."', async () => {
    const wrapper = document.getElementById('url-shortener-wrapper');
    const input = document.getElementById('url-shortener-input');
    input.value = "https//www.google.de";

    const urlShortener = new UrlShortener();
    await urlShortener.handleButtonClick();

    expect(wrapper.innerHTML).toContain('Invalid URL submitted.');
  });

  test('should show the error message "Invalid URL submitted."', async () => {
    const wrapper = document.getElementById('url-shortener-wrapper');
    const input = document.getElementById('url-shortener-input');
    input.value = "https://www";

    const urlShortener = new UrlShortener();
    await urlShortener.handleButtonClick();

    expect(wrapper.innerHTML).toContain('Invalid URL submitted.');
  });
});

describe('Testing error catching in requestApi', () => {

  beforeEach(() => {
    document.body.innerHTML = `
      <form id="url-shortener-form"></form>
      <input id="url-shortener-input"/>
      <button id="url-shortener-button"></button>
      <div id="url-shortener-wrapper"></div>
      <section id="url-shortener-section"></section>
    `;
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should show the error message "No URL specified."', () => {
    const wrapper = document.getElementById('url-shortener-wrapper');

    urlShortenerApi.short.mockImplementation(() => {
      throw new Error('Service not available');
    });

    const urlShortener = new UrlShortener(urlShortenerApi);
    urlShortener.requestApi();

    expect(wrapper.innerHTML).toContain('An error occurred, please try again later.');
  });
});

describe('Testing is valid or not valid url', () => {

  beforeEach(() => {
    document.body.innerHTML = `
      <form id="url-shortener-form"></form>
      <input id="url-shortener-input"/>
      <button id="url-shortener-button"></button>
      <div id="url-shortener-wrapper"></div>
      <section id="url-shortener-section"></section>
    `;
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should be not a valid url', () => {
    let urlShortener = new UrlShortener();
    const result = urlShortener.isValidUrl('http://');
    expect(result).toBeFalsy();
  })

  test('should be not a valid url', () => {
    let urlShortener = new UrlShortener();
    const result = urlShortener.isValidUrl('http://www.');
    expect(result).toBeFalsy();
  })

  test('should be not a valid url', () => {
    let urlShortener = new UrlShortener();
    const result = urlShortener.isValidUrl('www.');
    expect(result).toBeFalsy();
  })
});