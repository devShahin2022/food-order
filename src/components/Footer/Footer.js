import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <div className='bg-dark text-white py-5 mt-5'>
            <Container>
                <div className='row'>
                    <div className = 'col-6 col-md-4 col-lg-3'>
                        <img className='img-fluid w-100' src="https://t4.ftcdn.net/jpg/02/09/64/33/240_F_209643310_7tdlZx6oMF9iPqnt2PzbXdfYTNKGohdm.jpg" alt="" />
                        <h4 className='text-info my-3'>About Food</h4>
                        <p className="lead">I will try to deliver foods as my customer demands. This is my first think that the custormer statisfy are not.</p>
                        <hr />
                        <div className='d-flex flex-wrap justify-content-between my-3 mb-5'>
                            <button style={{"width":"35px", "height":"35px"}} className='me-2 bg-light rounded-circle'>Y</button>
                            <button style={{"width":"35px", "height":"35px"}} className='me-2 bg-light rounded-circle'>F</button>
                            <button style={{"width":"35px", "height":"35px"}} className='me-2 bg-light rounded-circle'>I</button>
                            <button style={{"width":"35px", "height":"35px"}} className='me-2 bg-light rounded-circle'>T</button>
                        </div>                            
                    </div>
                    <div className = 'col-6 col-md-4 col-lg-3'>
                        <h4 className='text-info my-3'>Quick links</h4>
                        <div className='flex flex-column pb-3'>
                            <p className="lead"><NavLink className='nav-link' to='/'>Home</NavLink></p>
                            <p className="lead"><NavLink className='nav-link' to='/services'>Services</NavLink></p>
                            <p className="lead"><NavLink className='nav-link' to='/'>Blogs</NavLink></p>
                            <p className="lead"><NavLink className='nav-link' to='/'>Google</NavLink></p>
                            <p className="lead"><NavLink className='nav-link' to='/'>Food panda</NavLink></p>
                            <p className="lead"><NavLink className='nav-link' to='/'>You tube</NavLink></p>
                        </div>
                    </div>
                    <div className = 'col-6 col-md-4 col-lg-3'>
                        <h4 className='text-info my-3'>Payment</h4>
                        <img className='img-fluid w-100' src="https://store-cdn.arduino.cc/uni/wysiwyg/Payment_Options.jpg" alt="" />
                        <hr />
                        <div className='py-2'>
                            <p className='text-light lead'>Cash on delivery</p>
                        </div>
                    </div>
                    <div className = 'col-6 col-md-4 col-lg-3'>
                        <h4 className='text-info my-3'>Location</h4>
                        <img className='img-fluid w-100' src="https://assets.website-files.com/5e832e12eb7ca02ee9064d42/5f7db426b676b95755fb2844_Group%20805.jpg" alt="" />
                        <hr />
                        <div className='py-2'>
                            <p className='text-light lead'>Dhaka Badda , road-12</p>
                            <p className='text-light lead'>Phone : ++033333333</p>
                            <p className='text-light lead'>Email : email@gmail.com</p>
                        </div>
                    </div>
                </div>
                <p className="lead text-light text-center">Copyrights @Md Shahin Alam 2022</p>
            </Container>
        </div>
    );
};

export default Footer;