export default class UrlShortener {

  constructor() {
    // Get all necessary elements
    this.urlShortenerForm = document.querySelector('#url-shortener-form');
    this.urlShortenerInput = document.querySelector('#url-shortener-input');
    this.urlShortenerButton = document.querySelector('#url-shortener-button');
    this.urlShortenerWrapper = document.querySelector('#url-shortener-wrapper');
    this.urlShortenerSection = document.querySelector('#url-shortener-section');

    // Make sure all elements are accessible
    if (this.urlShortenerForm !== null || this.urlShortenerInput !== null || this.urlShortenerButton !== null) {
      this.events();
    }
  }

  /**
   * Register necessary event handlers.
   *
   * Registers click handler for the url-shortener-button and a handler for the
   * submit event of the form element.
   *
   * @since 1.0.0
   * 
   */
  events() {
    this.urlShortenerForm.addEventListener('submit', function (e) { e.preventDefault() });
    this.urlShortenerButton.addEventListener('click', this.handleButtonClick.bind(this));
  }

  /**
  * Handle Url Shortener Button Click.
  *
  * This function is responsible for handling the click of a visitor on the url shortener button.
  *
  * @since 1.0.0
  * 
  */
  handleButtonClick() {
    // Get string from input
    let str = this.urlShortenerInput.value;

    // Check if its not empty
    if (str == '') {
      this.showErrorMessage('No URL specified.');
      return;
    }

    // Check if its a valid url
    if (!this.isValidUrl(str)) {
      this.showErrorMessage('Invalid URL submitted.');
      return;
    }

    // Make API request
    this.requestApi(str);
  }

  /**
  * Validate url
  *
  * Validates if the given string is a valid url
  *
  * @since 1.0.0
  * 
  */
  isValidUrl(str) {
    let pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
  }

  /**
  * API Request.
  *
  * Makes a request to the shrtco api
  *
  * @since 1.0.0
  * 
  */
  requestApi(str) {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    fetch(`https://api.shrtco.de/v2/shorten?url=${str}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.ok == true) {
          this.showResults(result).call(this);
        } else {
          switch (result.error_code) {
            case 1:
              this.showErrorMessage('No URL specified.');
              break;
            case 2:
              this.showErrorMessage('Invalid URL submitted.');
              break;
            case 3:
              this.showErrorMessage('Rate limit reached. Wait a second and try again.');
              break;
            case 4:
              this.showErrorMessage('IP-Address has been blocked.');
              break;
            case 5:
              this.showErrorMessage('Shortcode slug is already taken / in use.');
              break;
            case 10:
              this.showErrorMessage('Trying to shorten a disallowed link.');
              break;
            default:
              this.showErrorMessage('Unknown error, please try again later.');
              break;
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /**
  * Removes error message
  *
  * If an error message does exist, it will get removed, otherwise nothing happens
  *
  * @since 1.0.0
  * 
  */
  removeErrorMessageIfNecessary() {
    const errorMessage = document.querySelector('#url-shortener-error-message-wrapper');

    if (errorMessage !== null) errorMessage.remove();
  }

  /**
  * Create a new error message
  *
  * Creates a new error message and injects it into 
  * the dom to display it to the user
  *
  * @since 1.0.0
  * 
  */
  showErrorMessage(errorMessage) {
    // Remove existing error message if one exists
    this.removeErrorMessageIfNecessary();

    // Create error message wrapper
    let errorMessageWrapper = document.createElement('div');
    errorMessageWrapper.classList.add('bg-red-600', 'text-center', 'rounded', 'py-4', 'text-white', 'text-lg', 'mb-4', 'flex', 'flex-row', 'items-center', 'px-5');
    errorMessageWrapper.id = "url-shortener-error-message-wrapper";

    // Create close icon
    let errorMessageClose = document.createElement('i');
    errorMessageClose.classList.add('fa-solid', 'fa-xmark', 'cursor-pointer');
    errorMessageClose.addEventListener('click', this.removeErrorMessageIfNecessary);

    // Create error message paragraph
    let errorMessageParagraph = document.createElement('p');
    errorMessageParagraph.textContent = errorMessage;
    errorMessageParagraph.classList.add('grow');

    // Add paragraph to wrapper
    errorMessageWrapper.append(errorMessageClose);
    errorMessageWrapper.append(errorMessageParagraph);

    // Inject into the dom
    this.urlShortenerWrapper.insertAdjacentElement('afterbegin', errorMessageWrapper);
  }

  /**
  * Displays results
  *
  * Displays the results of the shortening to the user
  *
  * @since 1.0.0
  * 
  */
  showResults(result) {
    document.body.classList.add('overflow-hidden');

    let resultsWrapper = document.createElement('div');
    resultsWrapper.classList.add(
      'w-full',
      'h-full',
      'bg-transparent-black',
      'flex',
      'items-center',
      'justify-center',
      'fixed',
      'top-0',
      'left-0',
      'z-[999]',
      'px-2'
    );
    resultsWrapper.id = "results";

    let resultsInnerWrapper = document.createElement('div');
    resultsInnerWrapper.classList.add(
      'bg-white',
      'rounded',
      'px-6',
      'py-4',
      'max-w-[350px]',
      'w-full',
      'overflow-hidden'
    )

    let resultsCloseIcon = document.createElement('i');
    resultsCloseIcon.classList.add(
      'fa-solid',
      'fa-xmark',
      'text-2xl',
      'cursor-pointer'
    );
    resultsCloseIcon.addEventListener('click', this.closeResults);

    let resultsLinkIconWrapper = document.createElement('div');
    resultsLinkIconWrapper.classList.add(
      'flex',
      'items-center',
      'justify-center',
      'w-14',
      'mx-auto',
      'drop-shadow-2xl',
      'aspect-square',
      'rounded-full',
      'bg-primary-cyan',
      'mt-2',
      'mb-6',
    );

    let resultsLinkIcon = document.createElement('i');
    resultsLinkIcon.classList.add(
      'fa-solid',
      'fa-link',
      'text-xl',
      'text-white'
    );

    let resultsTitle = document.createElement('h2');
    resultsTitle.classList.add(
      'text-gray-600',
      'font-medium',
      'mt-4',
      'text-center',
      'text-xl'
    );
    resultsTitle.textContent = "Your New Link";

    let resultsLinkParagraph = document.createElement('p');
    resultsLinkParagraph.classList.add(
      'text-2xl',
      'mt-7'
    );
    resultsLinkParagraph.textContent = result.result.full_short_link;

    let resultsCopyButton = document.createElement('button');
    resultsCopyButton.classList.add(
      'bg-primary-cyan',
      'shadow-2xl',
      'w-full',
      'rounded',
      'py-3',
      'mt-12',
      'mb-4',
      'drop-shadow-xl',
      'font-semibold',
      'text-lg',
      'text-white',
    )
    resultsCopyButton.textContent = "Copy";
    resultsCopyButton.addEventListener('click', () => this.copyLinkToClipboard(result.result.full_short_link));
    resultsCopyButton.id = "results-copy-button";

    // Append and inject into DOM
    resultsWrapper.append(resultsInnerWrapper);

    resultsInnerWrapper.append(resultsCloseIcon);

    resultsInnerWrapper.append(resultsLinkIconWrapper);

    resultsLinkIconWrapper.append(resultsLinkIcon);

    resultsInnerWrapper.append(resultsTitle);

    resultsInnerWrapper.append(resultsLinkParagraph);

    resultsInnerWrapper.append(resultsCopyButton);

    this.urlShortenerSection.insertAdjacentElement(
      'beforeend',
      resultsWrapper
    );
  }

  copyLinkToClipboard(url) {
    navigator.clipboard.writeText(url).then(function () {
      /* clipboard successfully set */
      let button = document.querySelector('#results-copy-button');
      button.classList.remove('bg-primary-cyan');
      button.classList.add('bg-emerald-500');
      button.textContent = 'Copied';
    }, function () {
      /* clipboard write failed */
    });
  }

  closeResults() {
    let results = document.querySelector('#results');

    if (results !== null)
      results.remove();

    document.body.classList.remove('overflow-hidden');
  }
}

// module.exports.UrlShortener = UrlShortener;