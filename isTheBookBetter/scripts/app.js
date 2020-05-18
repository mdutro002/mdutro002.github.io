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

const outputMovie = () => {
  //toggle hidden class on movieRes div
}

//traverses xml data returned from goodreads api and pushes to bookResult div
const outputBookData = (xmlData) => {
  console.log(xmlData);
  xmlDoc = $.parseXML( xmlData );
  $bookInfo = $(xmlDoc);
  console.log($(xmlDoc)); //returns empty object
  $bookDetails = $bookInfo.find("work");
  console.log($(xmlData).find("work"));
  console.log($bookDetails);
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
    //pass top 1 result to returnMovie();
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
    // searchGR(searchString);
  })

})