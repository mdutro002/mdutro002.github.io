## Is The Book Better?

This is just a simple project to compare user reviews between books and their movie counterparts by using one search string
to pull data from the OMDB and Goodreads APIs in a simple display.

It's important to note that this prototype doesn't deal with the biggest issue this project faces, which is one-to-one 
comparisons betweens data. So searching for "The Hobbit" will yield multiple results for movies, leading to potential issues.

Because of the differences in indexing between the two API's used (Goodreads and OMDB), this project will need a little 
love in the future to get more reliable results. This is going to require a bit more time than I have to devote to this project
at the moment, but I do plan on improving this programmatically as much as I can 


## Planned Features:

* 'next result' button: adjust API to make multiple returns, and have this button iterate through those returns so one could get whatever movie version of "The Hobbit" they wanted to compare
* 'add to to-read shelf' button: use OAuth to allow for users to push the resulting book to their to-read list after a search
