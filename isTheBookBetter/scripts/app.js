/* eslint-disable */
//RESOURCES:
//

const searchGR = () => {
  $.ajax({
  url: "https://www.goodreads.com/search/index.xml?q=godfather" ,
  type: 'GET',
  '$limit': 1
}).done(function(data) {
  console.log(data);
});
}



$(() => {
  searchGR();

})