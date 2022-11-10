import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Menubar from '../../components/Navbar/Menubar';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import Footer from '../../components/Footer/Footer';
import HomeBanner from './Components/HomeBanner/HomeBanner';
import TopFood from './Components/TopFood/TopFood';
import CustomOrder from './Components/CustomOrder/CustomOrder';

const Home = () => {

    // state
    const [foods, setFoods] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://assignment11-back-end.vercel.app/services-3')
        .then(res => res.json())
        .then(data => {
            setFoods(data);
            setLoading(false);
        })
        .catch(error => {
            console.log(error);
        })
    }, [])

    return (
        <div>
            <Menubar></Menubar>
            <HomeBanner></HomeBanner>
            <div className='container py-5 bg-white'>
                <h1 className='text-dark text-center px-2 py-3 mb-4'>Check recent Foods I will provide</h1>
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
                <div className='text-center'><Link to='services'><button className='btn btn-outline-info me-auto my-2 mb-4 px-5 py-3'>Browse all foods</button></Link></div>
            </div>
            {/* custom order */}
            <CustomOrder></CustomOrder>
            {/* Top sells food */}
            <TopFood></TopFood>
            {/* Footer */}
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
    console.log();
    return(
        <div className="col-md-6 mb-4">
            <PhotoProvider>
            <PhotoView key={idx} src={food.image[0]}>
                    <img src={food.image[0]} className='img-fluid w-100' alt="" />
                </PhotoView>
            </PhotoProvider>
            <hr />
            <div className='d-flex flex-wrap justify-content-between my-2 px-2'>
                <p className='lead'>{food.name}</p>
                <p className='d-flex'><span className='me-2'>Per piech / dish </span> <del>{food.perPiech} </del><h4 className='mx-2'>{food.perPiech - parseInt(food.discount*food.perPiech/100)}</h4> bdt</p>
                <p className='lead mt-3'>
                    {foodDesc} ...
                </p>
                <button className='btn btn-light text-info'>Order now</button>
            </div>
        </div>
    )
}


export default Home;