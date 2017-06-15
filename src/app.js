import css from './style.css';
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

  function showInformation(imageUrl, title, description) {
    console.log(imageUrl, title, description);
  }

  function searchInAPOD(input) {
    var URL = 'https://api.nasa.gov/planetary/apod?';
    var KEY = 'DEMO_KEY';
    axios.get(URL + 'date=' + input + '&api_key=' + KEY)
    // TODO: some loading animation
      .then(function (result) {
        showInformation(result.data.url, result.data.title, result.data.explanation);
      })
      .catch(manageError);
  }

  global.searchPhoto = function (form) {
    var date = formatFormValues(getFormValues(form));
    if (date) {
      searchInAPOD(date);
    }
  }
})();