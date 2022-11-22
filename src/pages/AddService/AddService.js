import React, { useState } from 'react';
import Footer from '../../components/Footer/Footer';
import Menubar from '../../components/Navbar/Menubar';
import useTitle from '../../Hooks/useTitle';
import { ToastContainer, toast } from 'react-toastify';
import GalleryModal from '../../components/GalleryModal/GalleryModal';

const AddService = () => {
    const [paths, setPaths] = useState();

      // title load
    useTitle('add service');
    

    const addService = (e) => {
        e.preventDefault();

        const form = e.target;
        const name = form.serviceName?.value;
        const perPiech = form.price.value;
        const discount = form.discount.value;
        const description = form.description.value;
        const images = form.imageUrls.value;
        const image = images.split(' ');
        const discountType = 'percent';
        

        if(name !== '' && perPiech !== '' && discount !== '' && description !== '' && images !== '' && image !== ''){
           alert("Every field ok") ;
           const finalUploadData = {name, perPiech, discount, description, image, discountType};
       
           fetch('https://assignment11-back-end.vercel.app/add-service', {
            method : "POST",
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify({finalUploadData})
           })
           .then(res => res.json())
           .then(data => {
                if(data.acknowledged && data.insertedId !== ''){
                    form.reset();
                    toast('Service uploaded success');
                }else{
                    alert('internal error . try again');
                }
            })
           .catch(error => {
                toast('error occured!');
           })

        }else{
            alert("Fill all field correctly");
        }
    }

// get photo url from gallery modal
 const callBackImagePath = (cbPath) => {
    setPaths(cbPath);
 }

    return (
        <div>
            <Menubar></Menubar>
            <h1 className='px-2 py-5 text-white bg-danger text-center'>Add a services</h1>
           <div className='container'> 
            <form onSubmit={addService} action="">
                <div className='my-2'>
                    <label className='mt-3 mb-2' htmlFor="">Service name</label>
                    <input name='serviceName' type="text" className='form-control' required />
                </div>
                <div className='row'>
                    <div className='col-6'>
                        <label className='mt-3 mb-2' htmlFor="">price</label>
                        <input name='price' className='form-control' type="number" required min='1' />
                    </div>
                    <div className='col-6'>
                        <label className='mt-3 mb-2' htmlFor="">Discount (percentage)</label>
                        <input name='discount' type='number' className='form-control' min='0' required ></input>
                    </div>
                </div>
                <label className='mt-3 mb-2' htmlFor="">Description</label>
                <textarea required className='w-100 form-control' name="description" id="" cols="30" rows="10"></textarea>
                <label className='mt-3 mb-2' htmlFor="">Media (image url)</label><br/>
                <GalleryModal callBackImagePath = {callBackImagePath}></GalleryModal>
                <textarea required defaultValue={paths?.join(" ")} placeholder='for multiple image upload you have to one "white space" between two image link' className='w-100 form-control'  name="imageUrls" id="" cols="30" rows="4"></textarea>
                <button type='submit' className='btn btn-danger my-4 mb-5'>Upload service</button>
            </form>
           </div>

           {/* footer */}
           <Footer></Footer>
           <ToastContainer></ToastContainer>
        </div>
    );
};

export default AddService;