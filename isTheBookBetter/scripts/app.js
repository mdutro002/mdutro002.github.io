/* eslint-disable */
//RESOURCES:
//https://www.goodreads.com/topic/show/17893514-cors-access-control-allow-origin
//https://api.jquery.com/jQuery.parseXML/ 


//cleans up text input from form on page and scrubs it for calling the api
const scrubURL = (string) => {
  //Need to replace spaces with percent signs so I can pass to apis
  let formattedString = string.replace(/\s/g, '%');
  console.log(formattedString);
}

const searchGR = () => {
  let apiKey = '?key=RnKpwA2VkQwJ2eVXmElg'
  let queryParam = '&q=godfather'
  $.ajax({
  url: 'https://cors-anywhere.herokuapp.com/https://www.goodreads.com/search/index.xml' + apiKey + queryParam,
  type: 'GET',
  '$limit': 1
  }).done(function(data) {
    console.log(data);
  });
}

const searchOMDB = () => {
  let startingURL = 'http://www.omdbapi.com/?apikey=3796b8a3'
  let queryParam = '&t=godfather';

  $.ajax({
    url: startingURL + queryParam,
    type: 'GET',

  }).done(function(data){
    console.log(data);
  })

}


$(() => {
  scrubURL('Suddenly Susan Saw a Monster');

})