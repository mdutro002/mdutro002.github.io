/* eslint-disable */
//RESOURCES:
//https://www.goodreads.com/topic/show/17893514-cors-access-control-allow-origin
//https://api.jquery.com/jQuery.parseXML/ 
//https://www.w3schools.com/css/css_rwd_viewport.asp
//https://www.geeksforgeeks.org/javascript-trigger-a-button-on-enter-key/


//cleans up text input from form on page and scrubs it for calling the api
const scrubURL = (string) => {
  let formattedString = string.replace(/\s/g, '+');
  return formattedString;
}

const makeModal = () => {
  //generic makeModal function that passes in templated string to display:
}

//return specific omdb result - this will make another call to the omdb api to return top result
const returnMovie = (imdbID) => {
  let startingURL = 'http://www.omdbapi.com/?apikey=3796b8a3'
  let queryParam = '&i=';
    $.ajax({
      url: startingURL + queryParam + imdbID,
      type: 'GET',
      '$limit': 10
    }).done(function(movieData){
      outputMovie(movieData);
  });
}

const outputMovie = (movieData) => {
  $('#movieImg').attr('src', movieData.Poster);
  $('#movieTitle').text(movieData.Title)
  $year = $('<h4>').text(`Year: ${movieData.Year}`)
  $metaScore = $('<h4>').text(`Metascore: ${movieData.Metascore}`);
  $('#movDescrip').append($year);
  $('#movDescrip').append($metaScore);
  $('#movieRes').toggleClass('hidden');
}

//traverses xml data returned from goodreads api and pushes to bookResult div
const outputBookData = (xmlData) => {
  allWorks = $(xmlData).find("work"); //selects XML elements at a slightly higher level
  firstWork = allWorks[0];
  allBooks = $(xmlData).find("best_book"); //selects all best_book XML items
  firstBook = allBooks[0];
  console.log();
  console.log();
  var fidnode = $(firstWork).find('id').text();//TODO - which of these gets bookid?
  var bidNode = $(firstBook).find('id').text();
  var titleNode = $(firstBook).find('title').text();
  var authorNode = $(firstBook).find('name').text();
  var imageNode = $(firstBook).find('image_url').text();

  $('#bookTitle').text(titleNode);
  $('#bookImg').attr('src', imageNode);
  $('#bookRes').toggleClass('hidden');

  //https://www.goodreads.com/book/show/
}

//goodreads search method call
const searchGR = (searchString) => {
  let cleanSearch = scrubURL(searchString);
  let apiKey = '?key=RnKpwA2VkQwJ2eVXmElg'
  let queryParam = '&q='
  $.ajax({
    url: 'https://cors-anywhere.herokuapp.com/https://www.goodreads.com/search/index.xml' + apiKey + queryParam + cleanSearch,
    type: 'GET',
    '$limit': 1
  }).done(function(data) {
    outputBookData(data);
  });
}

//omdb search method call
const searchOMDB = (searchString) => {
  let cleanSearch = scrubURL(searchString);
  let startingURL = 'http://www.omdbapi.com/?apikey=3796b8a3'
  let queryParam = '&s=';

  $.ajax({
    url: startingURL + queryParam + cleanSearch,
    type: 'GET',
    '$limit': 10
  }).done(function(data){
    returnMovie(data.Search[0].imdbID);
  })
}

//Start on-page calls
$(() => {
  //lets user submit form by hitting enter
  $("#search").keypress(function(event) { 
    if (event.keyCode === 13) { 
        $("#searchPrompt").click(); 
    } 
})

  $('#searchPrompt').on('click', () => {
    let searchString = $('#search').val();
    searchOMDB(searchString);
    searchGR(searchString);

  })

})