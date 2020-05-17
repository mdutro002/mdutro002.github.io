/* eslint-disable */
//RESOURCES:
//https://www.goodreads.com/topic/show/17893514-cors-access-control-allow-origin
//https://api.jquery.com/jQuery.parseXML/ 


//cleans up text input from form on page and scrubs it for calling the api
const scrubURL = (string) => {
  let formattedString = string.replace(/\s/g, '+');
  return formattedString;
}

//return specific omdb result - this will make another call to the omdb api to return top result
const returnMovie = (imdbID) => {
  let startingURL = 'http://www.omdbapi.com/?apikey=3796b8a3'
  let queryParam = '&i=';
    $.ajax({
      url: startingURL + queryParam + imdbID,
      type: 'GET',
      '$limit': 10
    }).done(function(mov){
      console.log(mov)
  });
}
//goodreads search method
const searchGR = (searchString) => {
  let cleanSearch = scrubURL(searchString);
  let apiKey = '?key=RnKpwA2VkQwJ2eVXmElg'
  let queryParam = '&q='
  $.ajax({
    url: 'https://cors-anywhere.herokuapp.com/https://www.goodreads.com/search/index.xml' + apiKey + queryParam + cleanSearch,
    type: 'GET',
    '$limit': 1
  }).done(function(data) {
    console.log(data);
    //parse XML here, then pass to output function
    bookDoc = $.parseXML(data);
    $bookXML = $(bookDoc);
  });
}

//omdb search method
const searchOMDB = (searchString) => {
  let cleanSearch = scrubURL(searchString);
  let startingURL = 'http://www.omdbapi.com/?apikey=3796b8a3'
  let queryParam = '&s=';

  $.ajax({
    url: startingURL + queryParam + cleanSearch,
    type: 'GET',
    '$limit': 10
  }).done(function(data){
    console.log(data);
    console.log(data[0][0].imdbID);
    //pass all OMDB data to output function
    //pass top 1 result to returnMovie();
    // returnMovie(data[0].imdbID);
  })
}

//Start on-page calls
$(() => {
  $('#searchPrompt').on('click', () => {
    let searchString = $('#search').val();
    $('#search').value = '';
      searchOMDB(searchString);
    // searchGR(searchString);
  })

})