import { useState } from 'react'
import './index.css'
import Nav from './Navigation/Nav'
import Products from './Products/Products'
import Recommended from './Recommended/Recommended'
import Sidebar from './Sidebar/Sidebar'
import Card from './components/Card'
// Database
import products from './Database/Data'


function App() {
  const[selectedCategory,setSelectedCategory] = useState(null)
  const[query,setQuery] = useState('')

  // input filter

  const handleInputChange = (event)=>{
    setQuery(event.target.value)
  }

  const filteredItems = products.filter((product)=>
    product.title.toLocaleLowerCase().indexOf(query.toLocaleLowerCase())!==-1
)

  // Radio filter
  const handleChange = (event)=>{
    setSelectedCategory(event.target.value)
  }

  // Button filter
  const handleClick = (event)=>{
    setSelectedCategory(event.target.value)
  }

  // Main filter function
  const filteredData = (products,selectedCategory,query)=>{
    let filteredProducts = products 
    // filtering items
    if(query){
      filteredProducts = filteredItems
    }
    // selected filter
    if(selectedCategory){
      filteredProducts =  filteredProducts.filter(({category,color,company,newPrice,title})=>category === selectedCategory || color === selectedCategory || company === selectedCategory || newPrice === selectedCategory || title === selectedCategory)
    }
    return filteredProducts.map(({img,title,star,reviews,newPrice,prevPrice})=>(
      <Card 
      key={Math.random()}
      img = {img}
      title = {title}
      star = {star}
      reviews = {reviews}
      newPrice = {newPrice}
      prevPrice = {prevPrice}
      
      />
    ))
  }
  const result = filteredData(products,selectedCategory,query)
  return (
    <>
      <Sidebar handleChange={handleChange}/>
      <Nav query={query} handleInputChange={handleInputChange}/>
      <Recommended handleClick = {handleClick}/>
      <Products result = {result}/>
    </>
  )
}

export default App
