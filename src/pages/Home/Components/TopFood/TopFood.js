import React from 'react';

const TopFood = () => {
    return (
        <div>
            <div className='container my-3 mt-5'>
                <div className='row mt-5'>
                    <div className='col-md-6'>
                        <img className='w-100 img-fluid' src="https://img.freepik.com/free-photo/baked-chicken-wings-asian-style-tomatoes-sauce-plate_2829-10657.jpg?size=626&ext=jpg&ga=GA1.2.1380690759.1667906269&semt=sph" alt="" />
                        <div className='bg-light px-2 py-4 rounded row'>
                            <div className='col-6'>
                                <p className="text-muted">Last 7 days</p>
                                <h2 className='text-primary'>400 dish sells</h2>
                            </div>
                            <div className='col-6'>
                                <p className="text-muted">Price</p>
                                <h2 className='text-primary'>200 tk</h2>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <h1 className='text-info fs-lg mb-4'>Recent top sell</h1>
                        <div className='my-2'>
                            <p className="lead">
                            A chicken is a bird. One of the features that differentiate it from most other birds is that it has a comb and two wattles. The comb is the red appendage on the top of the head, and the wattles are the two appendages under the chin. These are secondary sexual characteristics and are more prominent in the male.
                            </p>
                            <button className='btn btn-primary px-4 py-2 my-3'>Visit food</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopFood;