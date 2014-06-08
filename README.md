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

Datasets
--------

The data on the site comes from 2 datasets: cm-budgets and cm-pib.

### cm-budgets

This contains the data for the Councils' Budget pages. The source CSV has the columns:

* Head-account
* Head-account description
* Sub-account
* Sub-account description
* Year
* Reporting type
  * ACTUAL
  * BUDGET
* Amount
* Revenue/Expenditure
  * REVENUE
  * EXPENDITURE
* Recurrent/Investment
  * RECURRENT
  * INVESTMENT
* Expense type
* Region
  * Extrême-Nord
  * Nord
  * Adamaoua
  * Est
  * Sud
  * Centre
  * Ouest
  * Nord-Ouest
  * Sud-Ouest
  * Littoral
* Council
* Division type
  * COUNCIL
  * REGION
