/* eslint-disable */
//RESOURCES:
//https://www.goodreads.com/topic/show/17893514-cors-access-control-allow-origin



const encodeForURL = (string) => {
  //Need to replace spaces with percent signs so I can pass to apis
  //let formattedString = string.
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
  let apiKey = '3796b8a3'
}


$(() => {
  searchGR();

})