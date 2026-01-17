import React from 'react'
import { Route, Routes } from 'react-router-dom'
import App from '../App'
import Product from '../components/Product'
import AddProduct from '../components/Addproduct'




function Allroutes() {
  return (
   <>
   <Routes>
    <Route path="/app" element={<App/>}></Route>
      <Route path="/product" element={<Product/>}></Route>
        <Route path="/addproduct" element={<AddProduct/>}></Route>
          
   </Routes>
</>
  )
}

export default Allroutes