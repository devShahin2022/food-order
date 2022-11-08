import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { AuthContextInfo } from '../../cotext/Authcontext';

const Menubar = () => {
  const {user, logOut} = useContext(AuthContextInfo);

  // logout handle
  const logoutHandle = () => {
    logOut()
    .then(result => {
      console.log(result);
    })
    .catch(error => {
      console.log(error);
    })
  }
    return (
        <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
              <Link to='/' className='nav-link'>Home</Link>
              <Link to='/services' className='nav-link'>Services</Link>
              <Link to='/blog' className='nav-link'>Blog</Link>
              {
                user && user.uid ? <>
                <Link to='/add-service' className='nav-link'>Add Service</Link>
                <Link to='/orders' className='nav-link'>Orders</Link>
                <Link to='/reviews' className='nav-link'>Reviews</Link>
                <p className='lead ms-3'>{user?.email || ''}</p>
                <button onClick={logoutHandle} className='btn btn-sm rounded'>Logout</button> 
                </>
                :
                <>
                  <Link to='/register' className='nav-link'>Sign up</Link>
                  <Link to='/login' className='nav-link'>Login</Link>
                </>
              }
          </Nav>
        </Container>
      </Navbar>
    );
};

export default Menubar;