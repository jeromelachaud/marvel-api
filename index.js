const _ = require('lodash/fp');

const log = (x) => {
  console.log(x);
  return x;
};

const getPath = _.property('path');

const getExtension = _.property('extension');

const getPrice = _.property('price');

const getPrices = _.property('prices');

const getUrl = _.property('url');

const getUrls = _.property('urls');

const getTitle = _.property('title');

const getResults = _.property('results');

const getImages = _.property('images');

const getData = _.property('data');

const getPageCount = _.property('pageCount');

const getFirst = _.nth(0);

const lt100 = _.gt(100);

const lt4 = _.gt(4);

const getFirstImage = _.flowRight([getFirst, getImages]);

const responseToJSON = (response) => response.json();


const dataSource =
  'http://gateway.marvel.com/v1/public/comics?apikey=fc67721c305c84f50f7c6646c9b8d9d0';

const mountPoint = document.getElementById('comics');

const template = _.template(`
  <% _.each((comic) => { %>
    <ul>
      <li>
        <a href="<%= comic.url %>">
          <%= comic.title %>
          <img src="<%= comic.image %>">
        </a>
      </li>
    </ul>
  <% }, comics); %>
`);

const getComicsFromResponse = _.flowRight([getResults, getData]);

const getComicPrice = _.flowRight([getPrice, getFirst, getPrices]);

const getComicUrl = _.flowRight([getUrl, getFirst, getUrls]);

const getComicPath = _.flowRight([getPath, getFirstImage]);

const getComicExtension = _.flowRight([getExtension, getFirstImage]);

const getComicTemplateData = (comic) => ({
  url: getComicUrl(comic),
  title: getTitle(comic),
  image: _.join('.', [
    getComicPath(comic),
    getComicExtension(comic)
  ])
});

const prepareComicsForDisplay = _.map(getComicTemplateData);

const getLt100Pages = _.filter(_.flowRight([lt100, getPageCount]));

const getLt4Dollars = _.filter(_.flowRight([lt4, getComicPrice]));

const displayComics = _.curry((mountPoint, template, comics) =>
  mountPoint.innerHTML = template({ comics }));

const filterComics = _.flowRight([getLt4Dollars, getLt100Pages]);

const renderComics = _.flowRight([
  displayComics(mountPoint, template),
  prepareComicsForDisplay
]);

fetch(dataSource)
  .then(responseToJSON)
  .then(getComicsFromResponse)
  .then(filterComics)
  .then(renderComics);
