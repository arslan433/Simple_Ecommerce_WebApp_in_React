// import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import AddProduct from './AddProduct'
import UpdateProduct from './UpdateProduct'
import Protected from './Protected'
import ProductList from './ProductList'
import SearchComponent from './SearchComponent';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <h1>E- com project</h1> */}
        <Routes>
          
          <Route path='/login' element={<Login/>} />
          <Route path='/add' element={<Protected Cmp={AddProduct}/>} />
          <Route path='/update/:id' element={< Protected Cmp={UpdateProduct}/>} />
          <Route path='/update' element={< Protected Cmp={UpdateProduct}/>} />
          <Route path='/search' element={< Protected Cmp={SearchComponent}/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/' element={<ProductList/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
