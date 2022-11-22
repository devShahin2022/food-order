import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { AuthContextInfo } from '../../cotext/Authcontext';
import logo from '../../logo.svg';
import { ToastContainer, toast } from 'react-toastify';

const Menubar = () => {
  const {user, logOut} = useContext(AuthContextInfo);

  // logout handle
  const logoutHandle = () => {
    logOut()
    .then(result => {
      localStorage.removeItem('jwt');
      toast('Logout success');
      console.log(result);
    })
    .catch(error => {
      console.log(error);
    })
  }
  let activeStyle = {
    color : '#0dcaf0',
    transform : 'scale(1.04)'
  };
    return (
      <Navbar className='py-3 shadow shadow-lg' bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/"><span><img style={{ "width":"16%" }} className='img-fluid me-2' src={logo} alt="" /></span> Healthy food</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <NavLink to='/' style={({ isActive }) =>
              isActive ? activeStyle : undefined
            } className='nav-link'>Home</NavLink>
            
            <NavLink style={({ isActive }) =>
              isActive ? activeStyle : undefined
            } to='/services' className='nav-link'>Services</NavLink>
            <NavLink style={({ isActive }) =>
              isActive ? activeStyle : undefined
            } to='/blog' className='nav-link'>Blog</NavLink>
            {
              user && user.uid && 
              <>

                <NavLink style={({ isActive }) =>
                isActive ? activeStyle : undefined
                } to='/add-service' className='nav-link'>Add Service</NavLink>
                  <NavLink style={({ isActive }) =>
                  isActive ? activeStyle : undefined
                } to='/reviews' className='nav-link'>My reviews</NavLink>
                <NavLink style={({ isActive }) =>
                  isActive ? activeStyle : undefined
                } to='/gallery' className='nav-link'>Gallery</NavLink>


              </>
            }
          </Nav>

          {
            user && user.uid ? <>

          <Form className="d-flex">
            {
              user.photoURL?.length > 1 ?
              <>
                  <img title={user.email} style={{"width":"2rem","height":"2rem"}} className='rounded-circle me-3 border border-1 border-muted' src={user.photoURL} alt="" />
              </>
              :
              <>
                  <div  title={user.email} style={{"width":"2rem","height":"2rem"}} className='rounded-circle text-white bg-primary p-1  border border-1 border-muted d-flex justify-content-center align-items-center me-3' >{user.email.slice(0,1).toUpperCase()}</div>
              </>
            }
            <Button onClick={logoutHandle} className='btn btn-danger btn-sm'>Logout</Button>
          </Form>
           </>
           :
           <>
            <Form className="d-flex">
             <NavLink style={({ isActive }) =>
              isActive ? activeStyle : undefined
            } to='/register' className='btn btn-outline-primary me-3'>Sign up</NavLink>
             <NavLink  style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }to='/login' className='btn btn-info text-muted'>Login</NavLink>
            </Form>
           </>

          }
        </Navbar.Collapse>
      </Container>
      <ToastContainer />
    </Navbar>
    );
};

export default Menubar;