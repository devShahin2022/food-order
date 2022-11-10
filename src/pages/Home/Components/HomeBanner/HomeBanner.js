import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

const HomeBanner = () => {
    
        const [index, setIndex] = useState(0);
      
        const handleSelect = (selectedIndex, e) => {
          setIndex(selectedIndex);
        };


    return (
        <div style={{"position" : "relative"}} className='position-relative'>
            <Carousel  activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item style={{}} >
                <img
                className="d-block w-100"
                src="https://img.freepik.com/free-photo/crispy-fried-chicken-plate-with-salad-carrot_1150-20212.jpg?size=626&ext=jpg&ga=GA1.2.1380690759.1667906269&semt=sph"
                alt="First slide"
                />
                
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src="https://img.freepik.com/free-photo/chicken-skewers-with-slices-sweet-peppers-dill_2829-18813.jpg?size=626&ext=jpg&ga=GA1.2.1380690759.1667906269&semt=sph"
                alt="Second slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src="https://img.freepik.com/free-photo/delicious-fried-chicken-plate_144627-27383.jpg?size=626&ext=jpg&ga=GA1.2.1380690759.1667906269&semt=sph"
                alt="Third slide"
                />
            </Carousel.Item>
            </Carousel>
                <div style={{"backgroundColor" : "#000000cf","top" : "0","left" : "0"}} className='position-absolute w-100 h-100'>
                    <h1 id='bannerTitle' className='display-2 text-info text-center py-5 mt-5'>Welcome to my Shop</h1>
                    <p id='' className="d-none d-lg-block d-xl-block d-xxl-block lead text-center px-4 text-light">I will provide healthy foods. Its look amazing and I will bring your order within 30 miniutes.</p>
                    <div className='d-flex justify-content-center'>
                        <button id='' className="d-none d-lg-block d-xl-block d-xxl-block btn btn-primary text-light my-4 py-3 px-5">Browse all foods</button>
                    </div>
                </div>
        </div>
    );
};

export default HomeBanner;