(function () {
  'use strict';
  var svgSpinner = '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 45 45" stroke="#fff"><g transform="translate(1 1)" style="fill:none;stroke-width:2"><circle cx="22" cy="22" r="6"><animate attributeName="r" begin="1.5s" dur="3s" values="6;22" calcMode="linear" repeatCount="indefinite"/><animate attributeName="stroke-opacity" begin="1.5s" dur="3s" values="1;0" calcMode="linear" repeatCount="indefinite"/><animate attributeName="stroke-width" begin="1.5s" dur="3s" values="2;0" calcMode="linear" repeatCount="indefinite"/></circle><circle cx="22" cy="22" r="6"><animate attributeName="r" begin="3s" dur="3s" values="6;22" calcMode="linear" repeatCount="indefinite"/><animate attributeName="stroke-opacity" begin="3s" dur="3s" values="1;0" calcMode="linear" repeatCount="indefinite"/><animate attributeName="stroke-width" begin="3s" dur="3s" values="2;0" calcMode="linear" repeatCount="indefinite"/></circle><circle cx="22" cy="22" r="8"><animate attributeName="r" begin="0s" dur="1.5s" values="6;1;2;3;4;5;6" calcMode="linear" repeatCount="indefinite"/></circle></g></svg>';

  function start() {
    var loader = document.createElement('div');
    loader.id = 'loading-spinner';

    loader.style.position = 'absolute';
    loader.style.top = '0';
    loader.style.left = '0';
    loader.style.backgroundColor = 'rgba(0, 0, 0, .5)';
    loader.style.width = '100%';
    loader.style.height = '100%';
    loader.style.display = 'flex';
    loader.style.justifyContent = 'center';
    loader.style.alignItems = 'center';
    loader.innerHTML = svgSpinner;

    document.body.appendChild(loader);
  }

  function stop() {
    document.body.removeChild(document.getElementById('loading-spinner'));
  }

  module.exports = {
    start: start,
    stop: stop
  };

})();