import React, { Component } from 'react';
import shortid from 'shortid'
import classnames from 'classnames'

import './App.css';



class Product extends Component {

  constructor(props){
    super(props)
    this.state = {
      active: false
    }
  }

  toggleDescription(){
    this.setState({active: (this.state.active === false) ? true : false})
  }

  render(){
    let classes = classnames('Product', {selectedProduct: (this.state.active)});
    return <div className={classes} onClick={() => this.toggleDescription()}>{this.props.title}
      <div className="description">{this.props.description}</div>
    </div>
  }
}

function ProductList({selectedCat, products}) {
      /*Filter out items that don't match category*/
      const categoryMatches = products.filter(x =>  {
        const productCategories = x.categories.map(cats => cats.title)
        if(productCategories.indexOf(selectedCat) > -1){
          return true
        }
        return false
      })

      const productComponents = categoryMatches.map(x =>  {
          return <Product key={shortid.generate()} title={x.title} description={x.description}/>
      })

      return <div className="productListContainer ">
        {(productComponents.length !== 0) 
        ? <SearchBox products={productComponents}/> : 'Nothing in this category today :('}
      </div>
}

class SearchBox extends Component {

  constructor(props){
    super(props)
    this.state = {
      search: '',
    }
  }

  updateSearch(event){
    this.setState({search: event.target.value})
  }

  render(){
    let filtered = this.props.products.filter(item => {
      return item.props.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
    })
    return <div>
       <input className="SearchBox" type="text"
      value={this.state.search}
      onChange={(e) => this.updateSearch(e)}/>
      {(filtered.length !== 0) ? filtered : <div >no search results match..</div>}
      </div>
  }
}

function CategoryMenu({categories, selectedCat, catClick}) {
    const titles = categories.map(x => {
      let classes = classnames('title', {selectedCat: (selectedCat === x.title)})
      return <div 
        key={shortid.generate()} 
        className={classes} 
        onClick={() => catClick(x.title)}
      >{x.title}</div>
    })
    return (
      <div className="Categories"><h1>Store Cupboard</h1>{titles}</div>
    );
}

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      selectedCategory: '',
      categories: [],
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
      .then(data => this.setState({
        categories: this.state.categories.concat(data.data),
        /*intialize category as first item in data*/ 
        selectedCategory: data.data[0].title
      }))
  }


  getProducts() {
    return fetch('https://api.gousto.co.uk/products/v2.0/products?includes[]=categories&includes[]=attributes&sort=position&image_sizes[]=365&i')
      .then(data => data.json())
      .then(data => this.setState({products: this.state.products.concat(data.data)}))
  }


  handleCategoryClick = (catTitle) => {
    this.setState({selectedCategory: catTitle})
  }

  render() {
    return (
      <div className="App">
        <CategoryMenu 
          selectedCat={this.state.selectedCategory} 
          categories={this.state.categories} 
          catClick={this.handleCategoryClick.bind(this)}
        ></CategoryMenu>
        <ProductList 
          selectedCat={this.state.selectedCategory} 
          products={this.state.products}>
        </ProductList>
      </div>
    )
  }
}

export default App;
