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

//function to show modal - content
const showModal = (title, content, linkText) => {
  
}

//return specific omdb result - this will make another call to the omdb api to return top result
const returnMovie = (imdbID) => {
  let startingURL = 'https://www.omdbapi.com/?apikey=3796b8a3'
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
  imdbLink = `https://www.imdb.com/title/`
  linkID = movieData.imdbID;
  $('#movDescrip').empty(); //clears details
  $('#movieImg').attr('src', movieData.Poster); //sets poster image
  $('#movieTitle').text(movieData.Title) //sets title
  $year = $('<h4>').text(`Year: ${movieData.Year}`) 
  $metaScore = $('<h4>').text(`Metascore: ${movieData.Metascore}`);
  $('#movDescrip').append($year);
  $('#movDescrip').append($metaScore);
  $('#showMDets').on('click', () => { //moved the makeModal function within the book and movie methods
    $('#modalTitle').text(movieData.Title);
    $released = $('<h4>').text(`Year: ${movieData.Released}`);
    $directorEl = $('<h4>').text(`Director: ${movieData.Director}`);
    $plotEl = $('<h4>').text(`Plot: ${movieData.Plot}`);
    $('#modalText').append($released).append($directorEl).append($plotEl);
    $('#modalLink').attr('href', imdbLink + linkID);
    $('#viewButton').text('View on IMDB')
    $('#modal').toggleClass('hidden');
  });
}

//traverses xml data returned from goodreads api and pushes to bookResult div
const outputBookData = (xmlData) => {
  grLink = 'https://www.goodreads.com/book/show/'
  $('#bookDescrip').empty();
  allWorks = $(xmlData).find("work"); //selects XML elements at a slightly higher level
  firstWork = allWorks[0];
  allBooks = $(xmlData).find("best_book"); //selects all best_book XML items
  firstBook = allBooks[0];
  console.log(firstBook)
  var avgRating = $(firstWork).find('average_rating').text();
  var pubYear = $(firstWork).find('original_publication_year').text();
  var bidNode = $(firstBook).find('id').text();
  var authorNode = $(firstBook).find('author').find('name').text();
  var titleNode = $(firstBook).find('title').text();
  var imageNode = $(firstBook).find('image_url').text();
  $year = $('<h4>').text(`Year: ${pubYear}`)
  $released = $('<h4>').text(`Year: ${pubYear}`)
  $score = $('<h4>').text(`Review Average: ${avgRating} `);
  $('#bookDescrip').append($year);
  $('#bookDescrip').append($score);
  $('#bookTitle').text(titleNode);
  $('#bookImg').attr('src', imageNode);
  $('#showBDets').on('click', () => {
    $('#modalTitle').text(titleNode);
    $authorEl = $('<h4>').text(`Author: ${authorNode}`);
    $('#modalText').append($released).append($authorEl);
    $('#modalLink').attr('href', grLink + bidNode);
    $('#viewButton').text('View on Goodreads')
    $('#modal').toggleClass('hidden');
  });
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
  let startingURL = 'https://www.omdbapi.com/?apikey=3796b8a3'
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
  $('#searchPrompt').on('click', (e) => {
    let searchString = $('#search').val();
    if (searchString === "") {
      console.log('empty string! aborting search');
    }
    e.preventDefault();
    searchOMDB(searchString);
    searchGR(searchString);
    $('#movieRes').removeClass('hidden');
    $('#bookRes').removeClass('hidden');
    $('#search').text(''); // why is this not working
  })
 
  $('#modalClose').on('click', () => {
    $('#modal').toggleClass('hidden');
  })
})