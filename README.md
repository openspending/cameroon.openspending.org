Website for "Where does Cameroon's Money Go?"
=============================================

This contains the web frontend to the Cameroon budget site, a front-end
to the OpenSpending platform built in cooperation with the World Bank.

Initialize the repository
-------------------------

To run the site for local development, follow these steps: 

* Install [Jekyll](https://github.com/mojombo/jekyll/wiki)
* Make sure you're on the branch gh-pages
* Fetch the openspendingjs submodule with:
  * `git submodule init` 
  * `git submodule update`

Generate the site
-----------------

The site can be generated with this command from the repository root: 

    jekyll --server --auto 

This will run an HTTP server at port 4000 to serve the site. 


