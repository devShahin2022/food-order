import React from 'react';
import { createBrowserRouter} from "react-router-dom";
import Gallery from '../components/Gallery/Gallery';
import Page404 from '../components/Page404/Page404';
import AddService from '../pages/AddService/AddService';
import Blog from '../pages/Blog/Blog';
import Checkout from '../pages/Checkout/Checkout';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Orders from '../pages/Orders/Orders';
import Register from '../pages/Register/Register';
import Reviews from '../pages/Reviews/Reviews';
import Services from '../pages/Services/Services';
import SingleFood from '../pages/SingleFood/SingleFood';
import PrivateRotes from './PrivateRotes';

const router = createBrowserRouter([
    {
        path : '/',
        element : <Home></Home>
    },
    {
        path : '/services',
        element : <Services></Services>
    },
    {
        path : '/services/details/:id',
        loader : ({params}) => fetch(`https://assignment11-back-end.vercel.app/each-service?id=${params.id}`),
        element : <SingleFood></SingleFood>
    },
    {
        path : '/login',
        element : <Login></Login>
    },
    {
        path : '/register',
        element : <Register></Register>
    },
    {
        path : '/reviews',
        element : <PrivateRotes><Reviews></Reviews></PrivateRotes>
    },
    {
        path : '/blog',
        element : <Blog></Blog>
    },
    {
        path : '/add-service',
        element : <PrivateRotes><AddService></AddService></PrivateRotes>
    },
    {
        path : '/checkout',
        element : <PrivateRotes><Checkout></Checkout></PrivateRotes>
    },
    {
        path : '*',
        element : <Page404></Page404>
    },
    {
        path : '/gallery',
        element : <PrivateRotes><Gallery></Gallery></PrivateRotes>
    }
])

export default router;