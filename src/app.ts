require('./style.css');
var loading = require('./loading');
var axios = require('axios');
export interface apodResponse {
  url: string,
  title: string,
  explanation: string
}

export interface dateFormElements extends HTMLFormControlsCollection {
  year: {value: string},
  month: {value: string},
  day: {value: string}
}

(function () {
  'use strict';

  function manageError(error: Error) {
    alert(error);
  }

  function getFormValues(form: HTMLFormElement) {
    var formElements = form.elements;
    return [
      (formElements as dateFormElements).year.value,
      (formElements as dateFormElements).month.value,
      (formElements as dateFormElements).day.value
    ];
  }

  function formatFormValues(valuesArray: string[]) {
    valuesArray = valuesArray.map(function (num, i) {
      if (i !== 0 && parseInt(num) < 10) {
        return '0' + num;
      }
      return num.toString();
    });
    var asString = valuesArray[0] + '-' + valuesArray[1] + '-' + valuesArray[2];
    // TODO? Add this validation to the form onchanges
    var asDate = new Date(asString);
    if (asDate.getFullYear() === parseInt(valuesArray[0])
      && asDate.getMonth() + 1 === parseInt(valuesArray[1]) // JS month starts in 0
      && asDate.getDate() === parseInt(valuesArray[2])) {
      return asString;
    }
    return manageError(new Error('Has escrito una fecha que no existe'));
  }

  function showInformationIn(container: HTMLDivElement, imageUrl: string, title: string, description: string, callback: () => any) {
    var image = container.querySelector('.monitor-image');
    var descriptionBlock = container.querySelector('.monitor-description');
    var descriptionText = document.createElement('div');
    var descriptionTitle = document.createElement('h3');

    if (!descriptionBlock || !image) {
      return;
    }

    // Remove current title and description in case they exist
    descriptionBlock.innerHTML = '';

    (image as HTMLImageElement).src = imageUrl;
    descriptionTitle.innerHTML = title;
    descriptionText.innerHTML = description;

    // The image takes a time to load, avoid showing half the content
    (image as HTMLImageElement).onload = function () {
      if (!descriptionBlock) {
        return;
      }
      descriptionBlock.appendChild(descriptionTitle);
      descriptionBlock.appendChild(descriptionText);
      callback();
    }
  }

  function searchInAPOD(input: string) {
    var URL = 'https://api.nasa.gov/planetary/apod?';
    var KEY = 'DEMO_KEY';
    return axios.get(URL + 'date=' + input + '&api_key=' + KEY)
      .then(function (result: { data: apodResponse }) {
        return result.data;
      });
  }

  (global as any).searchPhoto = function (form: HTMLFormElement) {
    var date = formatFormValues(getFormValues(form));
    if (date) {
      loading.start();
      searchInAPOD(date)
        .then(function (data: apodResponse) {
          var parentNode = form.parentNode;
          if (parentNode instanceof HTMLDivElement) {
            showInformationIn(parentNode, data.url, data.title, data.explanation, loading.stop);
          }
        })
        .catch(manageError);
    }
  }

})();