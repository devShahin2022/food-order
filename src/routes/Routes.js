import React from 'react';
import { createBrowserRouter} from "react-router-dom";
import AddService from '../pages/AddService/AddService';
import Blog from '../pages/Blog/Blog';
import Checkout from '../pages/Checkout/Checkout';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Orders from '../pages/Orders/Orders';
import Register from '../pages/Register/Register';
import Reviews from '../pages/Reviews/Reviews';
import Services from '../pages/Services/Services';

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
        path : '/login',
        element : <Login></Login>
    },
    {
        path : '/register',
        element : <Register></Register>
    },
    {
        path : '/orders',
        element : <Orders></Orders>
    },
    {
        path : '/reviews',
        element : <Reviews></Reviews>
    },
    {
        path : '/blog',
        element : <Blog></Blog>
    },
    {
        path : '/add-service',
        element : <AddService></AddService>
    },
    {
        path : '/checkout',
        element : <Checkout></Checkout>
    },
    {
        path : '*',
        element : <h1>404 page not found!!!</h1>
    }
])

export default router;