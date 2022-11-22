import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import './Gallery.css';


const GalleryModal = ({callBackImagePath}) => {

    // for modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

//   for gallery
const [data, setData] = useState();
const [loading, setLoading] = useState(true);
const [time, setTime] = useState(Date.now());
const [checkBx, setCheckBx] = useState(false);
const [imagePath, setImagePath] = useState([]);
const [addImgLoading, setAddImgLoading] = useState(false);
const [parmanetDelLoading, setParmanetDelLoading] = useState(false);




// import images links
const importPhotoLinks = () => {
    if(checkBx && (imagePath.length > 0)){
        callBackImagePath(imagePath);
        setShow(false);
    }else{
        alert('Please select images')
    }
}





    useEffect(()=>{
        fetch('http://localhost:5000/get-file')
        .then(result => result.json())
        .then(d => {
            setData(d);
        });
    }, [time]);

    const uploadFile = (e) =>{
        e.preventDefault();
        setAddImgLoading(true);
        const form = e.target;
        // check all field manually and after send all form data....
        let formData = new FormData(form);
        formData.append('hostName', 'http://localhost:5000');
        fetch('http://localhost:5000/upload-file', {
          method: 'POST',
          body: formData
        })
        .then(async result => result.json())
        .then(data => {
            form.reset();
            if(data.status === true){
                setTime(Date.now());
                setLoading(false);
                setAddImgLoading(false);
            }
        })
        .catch(error => console.log(error));
    }
// store images links
const checkedFun = e => {
    if(e.target.checked){
        const currentImageUrl = e.target.value;
        const newImgPathUrl = [...imagePath , currentImageUrl];
        setImagePath(newImgPathUrl);
    }else{
        const updateImagePaths = imagePath.filter(i => i !== e.target.value);
        setImagePath(updateImagePaths);
    }
}
// permanent delete images
const deletePhotoPermanent = () => {
    setParmanetDelLoading(true);
    const confirm = window.confirm('Are sure to delete permanently');
    if(confirm){
      imagePath.forEach( e => {
        const imgPath = e;
        fetch('http://localhost:5000/delete-each-file',{
            method : 'POST',
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify({imgPath})
        })
        .then(result => result.json())
        .then(data => {
            setTime(Date.now());
            setImagePath([]);
            setParmanetDelLoading(false);
        })
        .catch(error => console.log(error));
      });
    }
}

  return (
    <>
      <Button variant="secondary" className='my-2' onClick={handleShow}>
        Import from galllery
      </Button>
      <Modal
        size="xl"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton className='position-sticky sticky-top bg-light me-0 pe-4'>
          <Modal.Title>Gallery</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className='container'>
                <form onSubmit={uploadFile} encType='multipart/form-data' >
                    <div className="row border border-1">
                        <div required className="col-9"><input disabled={addImgLoading} required name='files' className='form-control w-100' type="file" multiple /></div>
                        <div className="col-3"><button disabled={addImgLoading} type='submit' className='btn btn-dark w-100'>{addImgLoading ? <Spinner animation="border" variant="light" /> : 'Add image'}</button></div>
                    </div>
                </form>
                <hr />
                <div className="my-3 alert alert-primary d-flex justify-content-between postion-sticky sticky-top">
                    
                    <div className='d-flex align-items-center'>
                        <button onClick={()=> {setCheckBx(!checkBx);if(checkBx){setImagePath([])}}} className={` btn m-2 ${checkBx ? 'btn-danger' : 'btn-info' } `}>{ checkBx ? 'Cancel select' : 'Select image' }</button>
                        {
                            checkBx && <h3 className="ms-2 ">Total select : <b>{imagePath.length}</b></h3>
                        }
                    </div>
                    <div className='d-flex align-items-center'>
                    <button disabled={parmanetDelLoading} onClick={deletePhotoPermanent} className='btn btn btn-danger me-2'>{parmanetDelLoading ?  <> Deleting <Spinner animation="border" variant="dark" /></> : 'Delete permanent'}</button>
                        <button onClick={importPhotoLinks} className='btn btn btn-primary m-2'>Export image</button>
                    
                    </div>
                </div>
                <form>
                    <div className='row'>
                        {
                            loading ? 
                            <>
                                <Spinner animation="border" variant="dark" />
                            </>
                            :
                            <>
                                {
                                    data?.length > 0 ? 
                                    <>
                                        {
                                        data?.map(image => <div key={image._id} className='col-3 mt-4 position-relatve' >
                                            
                                            {checkBx && <>
                                                <input onChange={checkedFun} className='position-absolute mt-5 ms-5 checkBoxAns' style={{"transform" : "scale(4)"}} type="checkbox" defaultValue={image.imagePath} name='linksVal' />
                                            </>
                                            }
                                            <img src={image.imagePath} className='w-100 img-fluid' alt="" />
                                        </div>)
                                        }
                                    </>
                                    :
                                    <>
                                        <h2 className='text-center mt-5 mb-5'>No image found</h2>
                                    </>
                                }
                            </>
                        }
                        
                    </div>
                </form>
            </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default GalleryModal;