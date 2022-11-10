import React, { useContext } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Menubar from '../../components/Navbar/Menubar';
import { AuthContextInfo } from '../../cotext/Authcontext';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import Footer from '../../components/Footer/Footer';
import useTitle from '../../Hooks/useTitle';
import { ToastContainer, toast } from 'react-toastify';

const SingleFood = () => {
   
    let sumofReview = 0 ;
    let avgReview = 0;
    const data = useLoaderData();
    const currentImg = data.result[0].image[0];
    const reviewLen =data.reviews.length;

    const {user} = useContext(AuthContextInfo);

    // title load
    useTitle('food details');

    // average review setup
    if(reviewLen > 0){
        data.reviews.forEach(r => {
            sumofReview += parseFloat(r.ratings);
        })
        avgReview = (sumofReview / reviewLen).toFixed(1);
    }
    
    const navigate = useNavigate();
    // add review
    const addReview = (e) => {
        e.preventDefault();
        if(user && user.uid){
            const date = new Date();
            const time = date.getTime();
            const ratings = e.target.ratings.value;
            const revText = e.target.reviewText.value;
            const userEmail = user.email;
            const userPhoto = user.photoURL;
            const foodId = data.result[0]._id;

            const finalReview = {time, ratings, revText, userEmail, foodId, userPhoto,date};
            if(parseFloat(ratings) <= 5 && parseFloat(ratings) > 0 ){
                fetch('https://assignment11-back-end.vercel.app/add-review',{
                    method : "POST",
                    headers : {
                        'content-type' : 'application/json'
                    },
                    body : JSON.stringify({finalReview})
                })
                .then(res => res.json())
                .then(data1 =>{
                    if(data1.acknowledged && data1.insertedId !== ''){
                        toast('Review add success');
                        e.target.reset();
                        const foodId = data.result[0]._id ;
                        navigate(`/services/details/${foodId}`);
                    }
                })
                .catch(error => toast('error'));
            }else{
                alert("please give valid ratings");
            }
            // console.log({time, ratings, revText, userEmail, foodId, userPhoto});
        }else{
            toast('Login required for add review');
        }
    }
    
    return (
        <div>
            <Menubar></Menubar>
            <h1 className='text-center px-2 py-5 bg-info text-center mb-4'>{data.result[0].name}</h1>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6'>
                    <PhotoProvider>
                        <PhotoView src={currentImg}>
                            <img className='w-100 img-fluid' src={currentImg} alt="" />
                        </PhotoView>
                    </PhotoProvider>
                        <div className='row my-2'>
                            {
                                data.result[0].image.map((img, idx) => {
                                    return (
                                            <BottomImg
                                            key={idx}
                                            img={img}
                                            idx = {idx}
                                            ></BottomImg>
                                    )
                                })
                            }
                            
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <h4><del>{data.result[0].perPiech}</del> -{data.result[0].discount +'%'}</h4>
                        <h1>{data.result[0].perPiech - parseInt((data.result[0].discount*data.result[0].perPiech)/100)} Bdt (per peach / per dish)</h1>
                        <p className="lead">Review : {avgReview}</p>
                        <label className='mt-3' htmlFor="">Number of plat / peach</label>
                        <input type="text" className='form-control mt-2' />
                        <label className='mt-3'>Additional note</label>
                        <textarea className='w-100 form-control mt-2' name="" id="" cols="30" rows="10"></textarea>
                        <button className='btn btn-info w-100 my-3 mb-4'>Order now</button>
                    </div>
                </div>
                <hr />
                <p className="lead my-4">{data.result[0].description}</p>
                <h3>reviews : {avgReview} ({data.reviews.length || 0})</h3>
                <div className='row'>
                    <div className='col-md-6'>
                        <form onSubmit={addReview} className='px-2 py-4 bg-light sticky-top' action="">
                            <input step="0.01" name='ratings' placeholder='keep ratings upto five' type="number" max="5" min="1" className='form-control my-2' />
                            <div className='d-flex justify-content-between'>
                                <textarea placeholder='Type your mind...' name='reviewText' className='form-control w-100 me-2' id=""  rows="1"></textarea>
                                <button type='submit' className='btn btn-dark text-white'>Add reviews</button>
                            </div>
                        </form>
                        {
                            data.reviews.length > 0 ? 
                            <>
                                {
                                    data.reviews.map(eachReview => {
                                        return (
                                            <ReviewShow
                                            key={eachReview._id}
                                            rev = {eachReview}
                                            ></ReviewShow>
                                        )
                                    })
                                }
                            </>
                            :
                            <>
                                <h3>No review found</h3>
                            </>
                        }
                    </div>
                    <div className='col-md-6'>

                    </div>
                </div>
            </div>


            {/* footer */}
            <Footer></Footer>
            <ToastContainer></ToastContainer>
        </div>
    );
};

const BottomImg = ({img, idx}) => {
    return (
        <div className="col-2 m-1 border-1">
             <PhotoProvider>
                <PhotoView key={idx} src={img}>
                    <img className='img-fluid w-100' src={img} alt="" />
                </PhotoView> 
             </PhotoProvider>
        </div>
    )
}

// each review
const ReviewShow = ({rev}) => {
    return (
            <div className='row border border-1 p-1 my-3'>
                <div className='col-3 p-2'>
                    {
                        rev.userPhoto !== '' ?
                        <>
                            <img style={{"width":"3.5rem","height":"3.5rem"}} className='rounded-circle' src={rev.userPhoto} alt="" />
                        </>
                        :
                        <>
                            <div style={{"width":"3.5rem","height":"3.5rem"}} className='rounded-circle text-white bg-primary p-1 d-flex justify-content-center align-items-center' >{rev.userEmail.slice(0,1).toUpperCase()}</div>
                        </>
                    }
                    <br/>
                    <div  style={{"overflow":"auto"}}><small>{rev.userEmail}</small></div>
                </div>
                <div className='col-9 p-2'>
                    <p>rattings : {parseFloat(rev.ratings).toFixed(1)}</p>
                    <p className="lead">{rev.revText}</p>
                    <i className='text-muted'>{rev.date}</i>
                </div>
            </div>
    )
}

export default SingleFood;