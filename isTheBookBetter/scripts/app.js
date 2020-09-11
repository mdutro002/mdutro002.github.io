//RESOURCES:
//https://www.goodreads.com/topic/show/17893514-cors-access-control-allow-origin
//https://api.jquery.com/jQuery.parseXML/ 
//https://www.w3schools.com/css/css_rwd_viewport.asp
//https://www.geeksforgeeks.org/javascript-trigger-a-button-on-enter-key/
//https://stackoverflow.com/questions/1262930/jquery-empty-div-except-for-matched-elements

//cleans up text input and scrubs it for calling the apis
const scrubURL = (string) => {
  let formattedString = string.replace(/\s/g, '+');
  return formattedString;
}

//function to compare scores, depending on result, adjusts recommendation text
const calcScore = (movieScore, bookScore) => {
  $scoreDiv = $('#compareResults')
  $scoreDiv.empty();
  let compScore = (bookScore * 20);
  if (movieScore > compScore) {
    $watchMovie = $('<h2>').text("Watch the Movie!")
    $scoreDiv.append($watchMovie);
  } else if (movieScore < compScore) {
    $readBook = $('<h2>').text("Read the Book!")
    $scoreDiv.append($readBook);
  }else if (movieScore == compScore){
    $moot = $('<h2>').text(" Either!")
    $scoreDiv.append($moot);
  }
}

// const loadMovie = () => { //I couldn't figure out how to turn this into a single abstracted function, so this will be two more duplicate functions
//   $divToLoad.append($('div').css({
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//     zIndex: 1000,
//     background: '#000',
//     opacity: 0.5
//   }).attr('id', 'loadingMovie'));
// }

// const loadBook = () => {
//   $divToLoad.append($('div').css({
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//     zIndex: 1000,
//     background: '#000',
//     opacity: 0.5
//   }).attr('id', 'loadingBook'));
// }

//return specific omdb result - this will make another call to the omdb api to return top result using its id
const returnMovie = (imdbID) => {
  //prompt loading gif
  let startingURL = 'https://www.omdbapi.com/?apikey=3796b8a3'
  let queryParam = '&i=';
    $.ajax({
      url: startingURL + queryParam + imdbID,
      type: 'GET',
    }).done(function(movieData){
      //end loading gif
      outputMovie(movieData);
  });
}

//clears former inputs (if any), parses through data object, and appends data to DOM
const outputMovie = (movieData) => {
  imdbLink = `https://www.imdb.com/title/`
  linkID = movieData.imdbID;
  $('#movDescrip').find('*').not('dl').not('dt').not('dd').remove();  //Hahaha, this has NO right to work, but it does. Removes everything but DL and child els on new search
  $('#movieImg').attr('src', movieData.Poster); //sets poster image
  $('#movieTitle').text(movieData.Title) //sets title
  var $year = $('<h4>').text(`Year: ${movieData.Year}`) 
  var movieScore = movieData.Metascore;
  $('#movDescrip').prepend($year);
  $('#metascoreContainer').text(movieScore);
  $('#showMDets').on('click', () => { //populates modal with information on click
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
}

//traverses xml data returned from goodreads api and pushes to bookResult div
const outputBookData = (xmlData) => {
  grLink = 'https://www.goodreads.com/book/show/' //I cannot use this link right now as there's an issue with the xml id's as they are output
  $('#bookDescrip').find('*').not('dl').not('dt').not('dd').remove();  //Hahaha, this has NO right to work, but it does. Removes everything but DL and child els on new search
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
  $('#bookDescrip').prepend($byear); //constructs book information div
  $('#grscoreContainer').text(avgRating);
  $('#bookTitle').text(titleNode);
  $('#bookImg').attr('src', imageNode);
  $('#showBDets').on('click', () => { //generates modal information on click
    $('#modalText').empty();
    $('#modalTitle').text(titleNode);
    $authorEl = $('<h4>').text(`Author: ${authorNode}`);
    $('#modalText').append($released).append($authorEl);
    $('#modalLink').attr('href', grLink + bidNode);
    $('#viewButton').text('disabled').attr('disabled', true); //i have to disable this button for now, see note on GrLink
    $('#modal').toggleClass('hidden');
  });
}

//goodreads search method call
const searchGR = (searchString) => {
  //prompt loading gif here
  let cleanSearch = scrubURL(searchString);
  let apiKey = '?key=Y02AhEfGVJ8lopaPWUuVA'
  let queryParam = '&q='
  $.ajax({
    url: 'https://cors-anywhere.herokuapp.com/https://www.goodreads.com/search/index.xml' + apiKey + queryParam + cleanSearch,
    type: 'GET',
    '$limit': 1
  }).done(function(data) {
    //end loading gif here
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
  //main functionality block
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
      $('#search').val('');
      $('#compareResults').empty();
      $('#compareResults').append('<h2>Calculating...</h2>');
      setTimeout(function(){ //after four seconds (long enough for DOM to populate with API data), calculates scores.
        $mScore = $('#metascoreContainer').text();
        $bScore = $('#grscoreContainer').text()
        calcScore($mScore, $bScore);
      }, 4000);
    }
  })
 
  $('#modalClose').on('click', () => {
    $('#modal').addClass('hidden');
  })
})