/* eslint-disable */
//RESOURCES:
//https://www.goodreads.com/topic/show/17893514-cors-access-control-allow-origin
//https://api.jquery.com/jQuery.parseXML/ 
//https://www.w3schools.com/css/css_rwd_viewport.asp
//https://www.geeksforgeeks.org/javascript-trigger-a-button-on-enter-key/


//cleans up text input and scrubs it for calling the apis
const scrubURL = (string) => {
  let formattedString = string.replace(/\s/g, '+');
  return formattedString;
}

//function to compare scores
const calcScore = (movieScore, bookScore) => {
  let compScore = (bookScore * 20);
  if (movieScore > compScore) {
    console.log('movie')
  } else if (movieScore < compScore) {
    console.log('book')
  }else if (movieScore == compScore){
    console.log('tie')
  }
}

//return specific omdb result - this will make another call to the omdb api to return top result
const returnMovie = (imdbID) => {
  let startingURL = 'https://www.omdbapi.com/?apikey=3796b8a3'
  let queryParam = '&i=';
    $.ajax({
      url: startingURL + queryParam + imdbID,
      type: 'GET',
      limit: 10
    }).done(function(movieData){
      outputMovie(movieData);
  });
}

const outputMovie = (movieData) => {
  imdbLink = `https://www.imdb.com/title/`
  linkID = movieData.imdbID;
  $('#movDescrip').empty(); //clears details from movie
  $('#movieImg').attr('src', movieData.Poster); //sets poster image
  $('#movieTitle').text(movieData.Title) //sets title
  var $year = $('<h4>').text(`Year: ${movieData.Year}`) 
  var movieScore = movieData.Metascore;
  var $metaScore = $('<h4>').text(`Metascore: ${movieScore}`);
  $('#movDescrip').append($year);
  $('#movDescrip').append($metaScore);
  $('#showMDets').on('click', () => { //moved the makeModal function within the book and movie methods
    $('#modalText').empty();
    $('#modalTitle').text(movieData.Title);
    $released = $('<h4>').text(`Year: ${movieData.Released}`);
    $directorEl = $('<h4>').text(`Director: ${movieData.Director}`);
    $plotEl = $('<h4>').text(`Plot: ${movieData.Plot}`);
    $('#modalText').append($released).append($directorEl).append($plotEl);
    $('#modalLink').attr('href', imdbLink + linkID);
    $('#viewButton').text('View on IMDB')
    $('#modal').toggleClass('hidden');
  });
  return movieScore;
}

//traverses xml data returned from goodreads api and pushes to bookResult div
const outputBookData = (xmlData) => {
  grLink = 'https://www.goodreads.com/book/show/' //I cannot use this link right now as there's an issue with the xml id's as they are output
  $('#bookDescrip').empty();
  allWorks = $(xmlData).find("work"); //This is me wrestling with the layers of the XML output
  firstWork = allWorks[0]; 
  allBooks = $(xmlData).find("best_book"); 
  firstBook = allBooks[0]; 
  var avgRating = $(firstWork).find('average_rating').text();//gets relevant data from xml objects defined above
  var pubYear = $(firstWork).find('original_publication_year').text();
  var bidNode = $(firstBook).find('best_book').find('id').text();
  var authorNode = $(firstBook).find('author').find('name').text();
  var titleNode = $(firstBook).find('title').text();
  var imageNode = $(firstBook).find('image_url').text();
  $byear = $('<h4>').text(`Year: ${pubYear}`)
  $released = $('<h4>').text(`Year: ${pubYear}`)
  $score = $('<h4>').text(`Review Average: ${avgRating} `);
  $('#bookDescrip').append($byear); //constructs book information div
  $('#bookDescrip').append($score);
  $('#bookTitle').text(titleNode);
  $('#bookImg').attr('src', imageNode);
  $('#showBDets').on('click', () => { //generates modal information on click
    $('#modalText').empty();
    $('#modalTitle').text(titleNode);
    $authorEl = $('<h4>').text(`Author: ${authorNode}`);
    $('#modalText').append($released).append($authorEl);
    $('#modalLink').attr('href', grLink + bidNode);
    $('#viewButton').text('View on Goodreads').attr('disabled', true); //i have to disable this button for now, see note on GrLink
    $('#modal').toggleClass('hidden');
  });
}

//goodreads search method call
const searchGR = (searchString) => {
  let cleanSearch = scrubURL(searchString);
  let apiKey = '?key=Y02AhEfGVJ8lopaPWUuVA'
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
  $search = $('#search');
  //lets user submit form by hitting enter
  $("#search").keypress(function(event) { 
    if (event.keyCode === 13) { 
        $("#searchPrompt").click(); 
    } 
})
  $('#searchPrompt').on('click', (e) => {
    let searchString = $('#search').val();
    if (searchString === "") {
      alert('empty string! aborting search');
    } else {
      e.preventDefault();
      searchOMDB(searchString);
      searchGR(searchString);
      $('#movieRes').removeClass('hidden');
      $('#bookRes').removeClass('hidden');
      $search.text(" "); // why is this not working??
      $mScore = $('movDescript').children().eq
      calcScore($('movDescrip'))
    }
  })
 
  $('#modalClose').on('click', () => {
    $('#modal').addClass('hidden');
  })
})