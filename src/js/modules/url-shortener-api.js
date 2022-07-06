class UrlShortenerApi {
  short(url, requestOptions) {
    return fetch(`https://api.shrtco.de/v2/shorten?url=${url}`, requestOptions)
      .then(response => response.json());
  }
}

export default new UrlShortenerApi();