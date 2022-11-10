import React from 'react';
import { Link } from 'react-router-dom';

const Page404 = () => {
    return (
        <div className='container'>
            <img className='w-100 img-fluid' src="https://img.freepik.com/free-vector/error-404-concept-landing-page_52683-21357.jpg?size=626&ext=jpg&ga=GA1.2.1380690759.1667906269&semt=sph" alt="" />
            <div className='d-flex justify-content-center my-5 mb-5'>
                <Link to='/'><button className='btn btn-primary py-3 px-5'>Go to home page</button></Link>
            </div>
        </div>
    );
};

export default Page404;