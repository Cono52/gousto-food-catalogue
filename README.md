Description
====================

A food catalogue using Gousto's API

Setup (Build Locally)
---------------------

To run, install the latest version of Node and NPM, >= 6.*.*.

Then in the directory run ```npm install```. *Might take little bit*

The components and how they consume the "category" and "product" API's
---------------------

The root component "App", upon mounting, retrieves the data from both endpoints using the Fetch API.
It stores in its state along with a "selectedCatogory" field to determine the products which that will eventually be displayed.

The "CategoryMenu" will control display the category fields and toggle the "selectedCategory" in it's parent.

The "ProductList" is given the product data and the "selectedCategory" field which will determine what the component shows.
This category filtered list is converted to clickable "Product" components, which simply hold the title, description and state to toggle if the description is visible.

Finally the "SearchBox" component, the child of "ProductList", is fed all the "Product" components
allowing them to be searched using the input field. 