import React, { useContext, useEffect, useState } from 'react';
import Menubar from '../../components/Navbar/Menubar';
import { AuthContextInfo } from '../../cotext/Authcontext';

const Reviews = () => {
    const [review, setReview] = useState();
    const [loading, setLoading] = useState(true);
    const {user} = useContext(AuthContextInfo);
    const email = user.email;

    useEffect(() => {
        const url = `http://localhost:5000/reviews-by-email?email=${email}`;

        fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setReview(data);
            setLoading(false);
        })
        .catch(error => console.log(error));
    }, [email]);

    console.log(review);

    return (
        <div>
            <Menubar></Menubar>
            <h1 className='text-center bg-primary text-white px-2 py-5'>My all reviews {review && review.length}</h1>
            <div className='container'>
                {
                    loading ? 
                    <>
                        <h2>Please wait data loading</h2>
                    </>
                    :
                    <>
                        {
                            review.map(r => {
                                return (
                                    <ReviewLoadByEmail
                                    key={r._id}
                                    eachReview = {r}
                                    ></ReviewLoadByEmail>
                                )
                            })
                        }
                    </>
                }
                
            </div>
        </div>
    );
};

// all reviews load
const ReviewLoadByEmail = ({eachReview}) => {

    console.log(eachReview);
    return (
            <div className='alert alert-success px-2 py-2 w-100 my-3 d-flex flex-wrap justify-content-between'>
                    <div>
                        <div className='row'>
                            <div className="col-6 d-flex flex-wrap">
                                <p className='lead'>ratings : {eachReview.ratings}</p>
                                <p className='lead'>Review : {eachReview.revText}</p>
                                <small>time : {eachReview.date}</small>
                            </div>
                            <div className="col-6">

                            </div>
                        </div>
                    </div>
                    <div className='d-flex align-items-center'>
                        <button className='btn btn-primary btn-sm me-3'>Edit</button>
                        <button className='btn btn-danger btn-sm me-3'>Delete</button>
                    </div>
            </div>
    )
}


export default Reviews;