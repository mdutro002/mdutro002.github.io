## Is The Book Better?

This is just a simple project to compare user reviews between books and their movie counterparts by using one search string
to pull data from the OMDB and Goodreads APIs in a simple display.

It's important to note that this prototype doesn't deal with the biggest issue this project faces, which is one-to-one 
comparisons betweens data. So searching for "The Hobbit" will yield multiple results for movies, leading to potential issues.

Because of the differences in indexing between the two API's used (Goodreads and OMDB), this project will need a little 
love in the future to get more reliable results. This is going to require a bit more time than I have to devote to this project
at the moment, but I do plan on improving this programmatically as much as I can 


## Planned Features:

* score comparison: scores will actually be calculated and compared, and have a 'result' h4 populate indicating whether you should read the book or watch the movie based on that comparison
* loading animation while api inits and pulls. Currently each search takes approximately 3-8 seconds to run.
* 'next result' button: adjust API to make multiple returns, and have this button iterate through those returns so one could get whatever movie version of "The Hobbit" they wanted to compare
* 'add to to-read shelf' button: use OAuth to allow for users to push the resulting book to their to-read list after a search


## Known Bugs:

* methodology button is not functional, but will be once score comparisons are implemented
* styling on the methodology button looks like hot garbage
