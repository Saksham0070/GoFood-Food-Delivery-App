import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link
import Badge from 'react-bootstrap/Badge';
import { useCart } from './ContextReducer';
import Model from '../Model';
import Cart from '../screens/Cart';

const Navbar = () => {
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();
  const data = useCart();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link> {/* Updated to use Link */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active fs-3" aria-current="page" to="/">
                Home
              </Link>
            </li>
            {(localStorage.getItem("authToken")) ?
              <li className="nav-item">
                <Link className="nav-link active fs-3" aria-current="page" to="/myorder">
                  My Orders
                </Link>
              </li>
              : ""}
          </ul>
          {(!localStorage.getItem("authToken")) ?
            <div className='d-flex'>
              <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
              <Link className="btn bg-white text-success mx-1" to="/creatuser">Signup</Link>
            </div>
            :
            <div>
              <div className='btn bg-white text-success mx-2' onClick={() => { setCartView(true) }}>
                My Cart {" "}
                <Badge bg='danger'>{data ? data.length : 0}</Badge> {/* Ensure data is defined */}
              </div>
              {cartView ? <Model onClose={() => { setCartView(false) }}><Cart /></Model> : null}
              <div className='btn bg-white text-danger mx-2' onClick={handleLogout}>Logout</div>
            </div>
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
