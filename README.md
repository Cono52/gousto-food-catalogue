Description
====================

A food catalogue using Gousto's API

Setup (Build Locally)
---------------------

To run, install the latest version of Node and NPM, >= 6.*.*.

Then in the directory run ```npm install```. *Might take little bit*

The components and how they consume Goustos "category" and "product" API's
---------------------

The root component "App", upon mounting, retrieves the data from both endpoints using the Fetch API.
It stores this data in its state along with a "selectedCategory" field to determine the products which will eventually be displayed.

The "CategoryMenu" will take click events from the displayed categories group and toggle the "selectedCategory" in it's parent.

The "ProductList" is given, from the "App" parent component, the product data and the "selectedCategory" field which will determine what product data is shown.
Once the product list is filtered using the "selectedCategroy" prop, the list is converted to clickable "Product" components, which simply hold the products title, description and state to toggle if the description is visible.

Finally the "SearchBox" component, the child of "ProductList", is fed all the "Product" components
allowing them to be searched using the input field. 