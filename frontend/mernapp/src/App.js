import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';
import CartProvider from './components/ContextReducer';
import MyOrder from './screens/MyOrder';

const App = () => {
  return (
    <CartProvider>
    <Router>
    <div className='fs-1'>
      <Routes>
        <Route exact path='/' element={<Home />}/>
        <Route exact path='/login' element={<Login />}/>
        <Route exact path='/creatuser' element={<Signup />}/>
        <Route exact path='/myorder' element={<MyOrder />}/>
      </Routes>
    </div>
    </Router>
    </CartProvider>
  )
}

export default App
