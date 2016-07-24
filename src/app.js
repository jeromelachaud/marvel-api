const css = require('./app.css');
const _ = require('lodash');

const fetchUrl = 'http://gateway.marvel.com/v1/public/comics?apikey=fc67721c305c84f50f7c6646c9b8d9d0';

// 1. Fetch the data
fetch(fetchUrl)
.then((response) => response.json());

// 2. Filter the data so that it only includes comics with less than 100 pages
// Vanilla
fetch(fetchUrl)
.then((response) => response.json())
.then((response) => {
  const arrayOfObjects = response.data.results;
  arrayOfObjects.filter((arrayItem) => arrayItem.pageCount < 100);
});

// 2. Filter the data so that it only includes comics with less than 100 pages
// lodash
fetch(fetchUrl)
.then((response) => response.json())
.then((response) => {
  const arrayOfObjects = response.data.results;
  _.filter(arrayOfObjects, o => o.pageCount < 100);
});

// 3. Filter the data so that it only includes comics that cost less than 4 dollars
// Vanilla
fetch(fetchUrl)
.then((response) => response.json())
.then((response) => {
  const arrayOfObjects = response.data.results;
  arrayOfObjects.map((arrayItem) => arrayItem.prices);
  arrayOfObjects.filter((arrayItem) => arrayItem.price < 4);
});

// 3. Filter the data so that it only includes comics that cost less than 4 dollars
// lodash
fetch(fetchUrl)
.then((response) => response.json())
.then((response) => {
  const arrayOfObjects = response.data.results;
  _.map(arrayOfObjects, 'prices[0].price')
  .filter((price) => price < 4);
});

// 4. Display the title and first image for each comic
// Vanilla
fetch(fetchUrl)
.then((response) => response.json())
.then((response) => {
  const arrayOfObjects = response.data.results;
  const comicsList = document.getElementById('comics');

  arrayOfObjects.map((arrayItem) => {
    const comicTitle = arrayItem.title;
    const liNode = document.createElement('li');
    const comicUrl = arrayItem.urls[0].url;
    comicsList.appendChild(liNode);
    liNode.innerHTML = JSON.stringify(comicTitle);

      const imgPath = arrayItem.path;
      const imgExtension = arrayItem.extension;
      const imgFullUrl = `${imgPath}.${imgExtension}`;
      const imgTag = document.createElement('img');
      imgTag.setAttribute('src', imgFullUrl);
      liNode.appendChild(imgTag);
    const firstImages = arrayItem.images[0];
  });
});
