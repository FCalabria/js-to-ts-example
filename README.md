# js-to-ts-example
A simple JS app to be migrated to Typescript. No frameworks used.

## Resources used in the app
- API: https://api.nasa.gov/api.html#apod
- Grid background in css: https://codepen.io/jasonadelia/pen/DnrAe
- Axios library (for http requests): https://github.com/mzabriskie/axios

## How to run it
1. Clone or download + unzip the repo
2. Open the system console and go to the main folder (here!)
2. Install dependancies running `npm install`
3. To create a dist version with webpack run `npm start`
4. Open **dist/index.html**
4. Webpack will watch for changes in the files and redeploy de dist version, but won't reload the browser