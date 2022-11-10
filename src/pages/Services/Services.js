import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Menubar from '../../components/Navbar/Menubar';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import Footer from '../../components/Footer/Footer';

const Services = () => {
     // state
     const [foods, setFoods] = useState();
     const [loading, setLoading] = useState(true);
 
     useEffect(() => {
         fetch('https://assignment11-back-end.vercel.app/services')
         .then(res => res.json())
         .then(data => {
             setFoods(data);
             setLoading(false);
         })
         .catch(error => {
             console.log(error);
         })
     }, []);


    return (
        <div>
            <Menubar></Menubar>
            <h1 className='bg-info text-center px-2 py-5 text-white'>All food super fast services</h1>
            <div className='container'>
            <p className='lead mb-3'>Current food presentations</p>
            <div className='row'>
                    {
                        loading ? 
                        <>
                         <p>Please wait data loading...</p>
                        </>
                        :
                        <>
                            {
                                foods.map((food, idx) => {
                                    return (
                                        <HomePageService 
                                        
                                        key={food._id}
                                        food = {food}
                                        idx = {idx}
                                        
                                        ></HomePageService>
                                    );
                                })
                            }
                        </>
                    }
                </div>
            </div>
            {/* footer */}
            <Footer></Footer>
        </div>
    );
};

const HomePageService = ({food, idx}) => {
    console.log(food);
    let foodDesc = '';
    console.log(food.description.length);
    if(food.description.length > 100){
        foodDesc = food.description.slice(0,100);
    }else{
        foodDesc = food.description;
    }
    return(
            <div className="col-md-6 mb-5 mt-3">
                <PhotoProvider>
                    <PhotoView key={idx} src={food.image[0]}>
                        <img src={food.image[0]} className='img-fluid w-100' alt="" />
                    </PhotoView> 
                </PhotoProvider>
            <hr />
            <div className='d-flex flex-wrap justify-content-between my-2 px-2'>
                <p className='lead'>{food.name}</p>
                <p className='d-flex'><span className='me-2'>Per piech / dish </span> <del>{food.perPiech} </del><h4 className='mx-2'>{food.perPiech - parseInt(food.discount*food.perPiech/100)}</h4> bdt</p>
                </div>
                <small>rattings</small>
                <p className='lead mt-3'>
                    {foodDesc} ...
                </p>
                <div className='d-flex flex-wrap justify-content-between w-100'>
                    <button className='btn alert alert-info'>Order now</button>
                   <Link to={`details/${food._id}`}><button className='btn alert alert-danger'>See details</button></Link> 
                </div>
            
        </div>
    )
}


export default Services;