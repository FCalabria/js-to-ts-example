import './style.css';
import loading from './loading';
import axios from 'axios';

(function () {
  'use strict';

  function manageError(error) {
    alert(error);
  }

  function getFormValues(form) {
    var formElements = form.elements;
    return [
      formElements.year.value,
      formElements.month.value,
      formElements.day.value
    ];
  }

  function formatFormValues(valuesArray) {
    valuesArray = valuesArray.map(function (num, i) {
      if (i !== 0 && num < 10) {
        return '0' + num;
      }
      return num.toString();
    });
    var asString = valuesArray[0] + '-' + valuesArray[1] + '-' + valuesArray[2];
    // TODO? Add this validation to the form onchanges
    var asDate = new Date(asString);
    if (asDate.getFullYear() == valuesArray[0]
      && asDate.getMonth() + 1 == valuesArray[1] // JS month starts in 0
      && asDate.getDate() == valuesArray[2]) {
      return asString;
    }
    manageError(new Error('Has escrito una fecha que no existe'));
  }

  function showInformationIn(container, imageUrl, title, description, callback) {
    var image = container.querySelector('.monitor-image');
    var descriptionBlock = container.querySelector('.monitor-description');
    var descriptionText = document.createElement('div');
    var descriptionTitle = document.createElement('h3');

    // Remove current title and description in case they exist
    descriptionBlock.innerHTML = '';

    image.src = imageUrl;
    descriptionTitle.innerHTML = title;
    descriptionText.innerHTML = description;

    // The image takes a time to load, avoid showing half the content
    image.onload = function() {
      descriptionBlock.appendChild(descriptionTitle);
      descriptionBlock.appendChild(descriptionText);
      callback();
    }
  }

  function searchInAPOD(input) {
    var URL = 'https://api.nasa.gov/planetary/apod?';
    var KEY = 'DEMO_KEY';
    return axios.get(URL + 'date=' + input + '&api_key=' + KEY)
      .then(function (result) {
        return result.data;
      });
  }

  global.searchPhoto = function (form) {
    var date = formatFormValues(getFormValues(form));
    if (date) {
      loading.start();
      searchInAPOD(date)
        .then(function (data) {
          showInformationIn(form.parentNode, data.url, data.title, data.explanation, loading.stop);
        })
        .catch(manageError);
    }
  }

})();