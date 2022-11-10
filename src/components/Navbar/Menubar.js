import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
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
      localStorage.removeItem('jwt');
      console.log(result);
    })
    .catch(error => {
      console.log(error);
    })
  }
    return (
      //   <Navbar bg="primary" variant="dark">
      //   <Container>
      //     <Navbar.Brand href="#home">Navbar</Navbar.Brand>
      //     <Nav className="me-auto">
      //         <Link to='/' className='nav-link'>Home</Link>
      //         <Link to='/services' className='nav-link'>Services</Link>
      //         <Link to='/blog' className='nav-link'>Blog</Link>
      //         {
      //           user && user.uid ? <>
      //           <Link to='/add-service' className='nav-link'>Add Service</Link>
      //           <Link to='/reviews' className='nav-link'>Reviews</Link>
      //           <p className='lead ms-3'>{user?.email || ''}</p>
      //           <button onClick={logoutHandle} className='btn btn-sm rounded'>Logout</button> 
      //           </>
      //           :
      //           <>
      //             <Link to='/register' className='nav-link'>Sign up</Link>
      //             <Link to='/login' className='nav-link'>Login</Link>
      //           </>
      //         }
      //     </Nav>
      //   </Container>
      // </Navbar>
      <Navbar className='sticky-top py-4 shadow shadow-lg' bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#">Healthy food</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Link to='/' className='nav-link'>Home</Link>
            <Link to='/services' className='nav-link'>Services</Link>
            <Link to='/blog' className='nav-link'>Blog</Link>
            {
              user && user.uid && 
              <>
                <Link to='/add-service' className='nav-link'>Add Service</Link>
               <Link to='/reviews' className='nav-link'>My reviews</Link>
              </>
            }
          </Nav>

          {
            user && user.uid ? <>

          <Form className="d-flex">
            {
              user.photoURL !== '' ?
              <>
                  <img title={user.email} style={{"width":"2rem","height":"2rem"}} className='rounded-circle me-3' src={user.photoURL} alt="" />
              </>
              :
              <>
                  <div style={{"width":"2rem","height":"2rem"}} className='rounded-circle text-white bg-primary p-1 d-flex justify-content-center align-items-center me-3' >{user.email.slice(0,1).toUpperCase()}</div>
              </>
            }
            <Button onClick={logoutHandle} className='btn btn-danger btn-sm'>Logout</Button>
          </Form>
           </>
           :
           <>
            <Form className="d-flex">
             <Link to='/register' className='btn btn-outline-primary me-3'>Sign up</Link>
             <Link to='/login' className='btn btn-info text-muted'>Login</Link>
            </Form>
           </>

          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
};

export default Menubar;