import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Menubar from '../../components/Navbar/Menubar';
import { AuthContextInfo } from '../../cotext/Authcontext';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Footer from '../../components/Footer/Footer';
import useTitle from '../../Hooks/useTitle';
import Spinner from 'react-bootstrap/Spinner';
import { ToastContainer, toast } from 'react-toastify';

const Reviews = () => {
    const [review, setReview] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ratting, setRatting] = useState();
    const [serviceName, setServiceName] = useState();
    const [text, setText] = useState();
    const [id, setId] = useState();
    const {user} = useContext(AuthContextInfo);
    const email = user.email;
    const [len, setLen] = useState();
    const [updater, setUpdater] = useState(20);
     
    // modals
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    // title load
    useTitle('reviews');

    const navigate = useNavigate();

    useEffect(() => {
        const url = `https://assignment11-back-end.vercel.app/reviews-by-email`;

        fetch(url,{
            method : 'POST',
            headers : {
                'content-type' : 'application/json',
                accesstoken : `Bearer ${localStorage.getItem('jwt')}`
            },
            body : JSON.stringify({email})

        })
        .then(res => {
            if(res.status === 401 ){
                return navigate('/login');
            }else{
                return res.json();
            }
        })
        .then(data => {
            setReview(data);
            setLen(data.length);
            setLoading(false);
            // fetch service name
            fetch(`https://assignment11-back-end.vercel.app/each-service?id=${data[0].foodId}`)
            .then(res => res.json())
            .then(d =>{
                setServiceName(d.result[0].name);
            })
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
    }, [email, len, updater]);



    // delete review
    const deleteReview = (id) => {
        const confirm = window.confirm('Danger ! you cannot recover again');
        if(confirm){

            const reviewId = id;
            fetch('https://assignment11-back-end.vercel.app/delete-review',{
                method : 'DELETE',
                headers : {
                    'content-type' : 'application/json',
                    accesstoken : `Bearer ${localStorage.getItem('jwt')}`
                },
                body : JSON.stringify({reviewId, email})
            })
            .then(res => {
                if(res.status === 401 ){
                    return navigate('/login');
                }else{
                    return res.json();
                }
            })
            .then(data => {
                if(data.acknowledged && data.deletedCount > 0){
                    toast('Delete success');
                    // just for rerender
                    setLen(len-1);    
                }else{
                    toast('Internal error');
                }
            })
            .catch(error => toast('error occure') );
        }
    }

    // Update review
    const handleShow = (data) => {
        setRatting(data.ratings);
        setText(data.revText);
        setId(data._id);
        setShow(true);
    }
    // Update data
    const upadteData = () => {
        const updatedRatting = parseFloat(ratting).toFixed(1);
        const updatedText = text;

        if(updatedRatting !== '' && updatedText !== ''){
            fetch('https://assignment11-back-end.vercel.app/update-review', {
                method : 'PUT',
                headers : {
                    'content-type' : 'application/json',
                    accesstoken : `Bearer ${localStorage.getItem('jwt')}`
                },
                body : JSON.stringify({updatedRatting, updatedText, id, email})
            })
            .then(res => {
                if(res.status === 401 ){
                    return navigate('/login');
                }else{
                    return res.json();
                }
            })
            .then(data => {
                if(data.acknowledged && data.modifiedCount > 0){
                    setShow(false);
                    // just for rerender
                    const date = new Date();
                    setUpdater(date);
                    toast('Updated success');
                }else{
                    toast('error occure');
                }
            })
            .catch(error => console.log(error));
        }else{
            alert('all filled required');
        }
    }


    return (
        <div>
            <Menubar></Menubar>
            <h1 className='text-center bg-primary text-white px-2 py-5'>My all reviews {review && review.length}</h1>
            <div className='container'>
                {
                    loading ? 
                    <>
                        <div style={{"height" : "100vh"}} className='w-100 d-flex justify-content-center mt-5'>
                            Loading... <Spinner animation="border" variant="dark" />
                        </div>
                    </>
                    :
                    <>
                        {
                            review.length < 1 ?
                            <>
                                <h3 className='text-center my-4 px-2'>No Review found</h3>
                            </>
                            :
                            <>
                                {
                                review.map(r => {
                                    return (
                                        <ReviewLoadByEmail
                                        key={r._id}
                                        eachReview = {r}
                                        deleteReview ={deleteReview}
                                        handleShow = {handleShow}
                                        serviceName = {serviceName}
                                        ></ReviewLoadByEmail>
                                    )
                                    })
                                }
                            </>
                        }
                    </>
                }
                
            </div>


            {/* review update modal */}

            <ToastContainer></ToastContainer>
            <>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <label className='mt-3 mb-2 ' htmlFor="">Rattings</label>
            <input onBlur={(e) => setRatting(e.target.value)} type="number" className='form-control' min='1' required max='5' step='0.01' defaultValue={ratting} />
            <label className='mt-3 mb-2' htmlFor="">Your review text</label>
            <textarea onBlur={(e) => setText(e.target.value)} defaultValue={text} id='review-text' name="" className='w-100 form-control' rows="3"></textarea>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Dismiss
          </Button>
          <Button onClick={upadteData} variant="primary">Update</Button>
        </Modal.Footer>
      </Modal>
    </>


    {/* footer */}
    <Footer></Footer>
        </div>
    );
};

// all reviews load
const ReviewLoadByEmail = ({eachReview , deleteReview, handleShow, serviceName}) => {

    return (
            <div className='alert alert-success px-2 py-2 w-100 my-3 d-flex flex-wrap justify-content-between'>
                    <div>
                        <div className='row'>
                            <div className="col-6 d-flex flex-column">
                                <p className='lead text-primary mx-2'>Food name : { serviceName || '' }</p>
                                <small>time : {eachReview.date}</small>
                            </div>
                            <div className="col-6">
                                <p className='lead'>ratings : {eachReview.ratings}</p> <br />
                                <p className='lead'>Text : {eachReview.revText}</p>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex align-items-center'>
                        <Link to={`/services/details/${eachReview.foodId}`}><button className='btn btn-sm btn-light text-primary me-3'>Visit service</button></Link>
                        <button onClick={() => handleShow(eachReview)} className='btn btn-primary btn-sm me-3'>Edit</button>
                        <button onClick={() => deleteReview(eachReview._id)} className='btn btn-danger btn-sm me-3'>Delete</button>
                    </div>
            </div>
    )
}


export default Reviews;