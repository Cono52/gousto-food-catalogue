import React, { Component } from 'react';
import './App.css';
import shortid from 'shortid'
import classnames from 'classnames'




class Products extends Component {

  render() {
    const productTitles = this.props.products.map(x => 
      <div className="prodTitle" key={shortid.generate()}>{x.title}</div>
    )
    return (
      <div>{productTitles}</div>
    );
  }
}

class CatItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        let classes = classnames('title', {selectedCat: (this.props.selectedCat === this.props.value)});
        return <div 
        className={classes} 
        onClick={() => this.props.onClick(this.props.value)}>{this.props.value}</div>;
    }
}

class CategoryMenu extends Component {

  render() {
    const titles = this.props.catItems.map(x => 
      <CatItem 
      key={shortid.generate()} 
      value={x.title}
      onClick={this.props.catClick}
      selectedCat={this.props.selectedCat}
      ></CatItem>
    )

    return (
      <div className="Categories">{titles}</div>
    );
  }
}

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      selectedCategory: '',
      catItems: [],
      products: []
    }
  }

  componentDidMount() {
    this.getCategories()
    this.getProducts()
  }

  getCategories() {
    return fetch('https://api.gousto.co.uk/products/v2.0/categories')
      .then(data => data.json())
      .then(data => this.setState({catItems: this.state.catItems.concat(data.data)}));
  }


  getProducts() {
    return fetch('https://api.gousto.co.uk/products/v2.0/products?includes[]=categories&includes[]=attributes&sort=position&image_sizes[]=365&i')
      .then(data => data.json())
      .then(data => this.setState({products: this.state.products.concat(data.data)}));
  }


  handleCategoryClick(catTitle){
    this.setState({selectedCategory: catTitle})
  }

  render() {
    return (
      <div className="App">
        <CategoryMenu 
        selectedCat={this.state.selectedCategory} 
        catItems={this.state.catItems} 
        catClick={this.handleCategoryClick.bind(this)}
        ></CategoryMenu>
        <Products products={this.state.products}></Products>
      </div>
    );
  }
}

export default App;
