import React, { Component } from 'react';
import './App.css';
import shortid from 'shortid'




class Products extends Component {

  constructor(props){
    super(props)
    this.state = {
      products: []
    }
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts() {
    return fetch('https://api.gousto.co.uk/products/v2.0/products?includes[]=categories&includes[]=attributes&sort=position&image_sizes[]=365&i')
      .then(data => data.json())
      .then(data => this.setState({products: this.state.products.concat(data.data)}));
  }


  render() {
    console.log(this.state.products)
    return (
      <div></div>
    );
  }
}


class CategoryMenu extends Component {

  constructor(props){
    super(props)
    this.state = {
      catItems: []
    }
  }

  componentDidMount() {
    this.getCategories()
  }

  getCategories() {
    return fetch('https://api.gousto.co.uk/products/v2.0/categories')
      .then(data => data.json())
      .then(data => this.setState({catItems: this.state.catItems.concat(data.data)}));
  }


  render() {
    const titles = this.state.catItems.map(x => 
      <div className="title" key={shortid.generate()}>{x.title}</div>
    )

    return (
      <div className="Categories">{titles}</div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <CategoryMenu></CategoryMenu>
        <Products></Products>
      </div>
    );
  }
}

export default App;
