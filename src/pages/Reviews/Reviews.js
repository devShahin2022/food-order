import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Menubar from '../../components/Navbar/Menubar';
import { AuthContextInfo } from '../../cotext/Authcontext';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Reviews = () => {
    const [review, setReview] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ratting, setRatting] = useState();
    const [text, setText] = useState();
    const [id, setId] = useState();
    const {user} = useContext(AuthContextInfo);
    const email = user.email;

    // modals
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    useEffect(() => {
        const url = `http://localhost:5000/reviews-by-email`;

        fetch(url,{
            method : 'POST',
            headers : {
                'content-type' : 'application/json',
                accesstoken : `Bearer ${localStorage.getItem('jwt')}`
            },
            body : JSON.stringify({email})

        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setReview(data);
            setLoading(false);
        })
        .catch(error => console.log(error));
    }, [email]);



    // delete review
    const deleteReview = (id) => {
        console.log(id);
        const reviewId = id;
        fetch('http://localhost:5000/delete-review',{
            method : 'DELETE',
            headers : {
                'content-type' : 'application/json',
                accesstoken : `Bearer ${localStorage.getItem('jwt')}`
            },
            body : JSON.stringify({reviewId, email})
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.acknowledged && data.deletedCount > 0){
                alert('delete data success');
            }else{
                alert('internal error');
            }
        })
        .catch(error => console.log(error));
    }

    // Update review
    const handleShow = (data) => {
        console.log(data);
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
            fetch('http://localhost:5000/update-review', {
                method : 'PUT',
                headers : {
                    'content-type' : 'application/json',
                    accesstoken : `Bearer ${localStorage.getItem('jwt')}`
                },
                body : JSON.stringify({updatedRatting, updatedText, id, email})
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if(data.acknowledged && data.modifiedCount > 0){
                    setShow(false);
                }else{
                    alert('interal error! please again try')
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
                        <h2>Please wait data loading</h2>
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
        </div>
    );
};

// all reviews load
const ReviewLoadByEmail = ({eachReview , deleteReview, handleShow}) => {

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
                        <Link to={`/services/details/${eachReview.foodId}`}><button className='btn btn-sm btn-light text-primary me-3'>Visit service</button></Link>
                        <button onClick={() => handleShow(eachReview)} className='btn btn-primary btn-sm me-3'>Edit</button>
                        <button onClick={() => deleteReview(eachReview._id)} className='btn btn-danger btn-sm me-3'>Delete</button>
                    </div>
            </div>
    )
}


export default Reviews;