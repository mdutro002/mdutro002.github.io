/* eslint-disable */
//RESOURCES:
//

const searchGR = () => {
  jQuery.ajaxPrefilter(function(options) {
    if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
  });

  $.ajax({
  url: "https://cors-anywhere.herokuapp.com/https://www.goodreads.com/search/index.xml?key=RnKpwA2VkQwJ2eVXmElg?q=godfather" ,
  type: 'GET',
  '$limit': 1
}).done(function(data) {
  console.log(data);
});
}



$(() => {
  searchGR();

})