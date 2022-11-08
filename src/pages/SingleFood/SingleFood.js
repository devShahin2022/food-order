import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Menubar from '../../components/Navbar/Menubar';

const SingleFood = () => {
    const data = useLoaderData();
    const currentImg = data[0].image[0];
    console.log(data);
    return (
        <div>
            <Menubar></Menubar>
            <h1 className='text-center px-2 py-5 bg-info text-center mb-4'>{data[0].name}</h1>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6'>
                        <img className='w-100 img-fluid' src={currentImg} alt="" />
                        <div className='row my-2'>
                            {
                                data[0].image.map((img, idx) => {
                                    return (
                                        <BottomImg
                                        key={idx}
                                        img={img}
                                        ></BottomImg>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <h4><del>{data[0].perPiech}</del> -{data[0].discount +'%'}</h4>
                        <h1>{data[0].perPiech - parseInt((data[0].discount*data[0].perPiech)/100)} Bdt (per peach / per dish)</h1>
                        <p className="lead">Review : 4.2</p>
                        <label className='mt-3' htmlFor="">Number of plat / peach</label>
                        <input type="text" className='form-control mt-2' />
                        <label className='mt-3'>Additional note</label>
                        <textarea className='w-100 form-control mt-2' name="" id="" cols="30" rows="10"></textarea>
                        <button className='btn btn-info w-100 my-3 mb-4'>Pay with {data[0].perPiech - parseInt((data[0].discount*data[0].perPiech)/100)} Bdt</button>
                    </div>
                </div>
                <hr />
                <p className="lead my-4">{data[0].description}</p>
                <h3>reviews : 3.5 (20)</h3>
                <div className='row'>
                    <div className='col-md-6'>
                        <form className='px-2 py-4 bg-light sticky-top' action="">
                            <input placeholder='keep ratings upto five' type="number" max="5" min="1" className='form-control my-2' />
                            <div className='d-flex justify-content-between'>
                                <input placeholder='type your mind' className='w-75 form-control' type="text" />
                                <button type='submit' className='btn btn-dark text-white'>Add reviews</button>
                            </div>
                        </form>
                        <div className='row border border-1 p-1 my-3'>
                            <div className='col-3 p-2'>
                                <img style={{"width":"3.5rem","height":"3.5rem"}} className='img-fluid rounded-circle' src={data[0].image[0]} alt="" />
                                <br/><small>Md Shahin alam</small>
                            </div>
                            <div className='col-9 p-2'>
                                <p className="lead">Just awesome</p>
                                <i className='text-muted'>22/12/2020</i>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-6'>

                    </div>
                </div>
            </div>
        </div>
    );
};

const BottomImg = ({img}) => {
    return (
        <div className="col-2 m-1 border-1">
            <img className='img-fluid w-100' src={img} alt="" />
        </div>
    )
}


export default SingleFood;