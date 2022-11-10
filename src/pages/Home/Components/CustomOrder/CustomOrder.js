import React from 'react';

const CustomOrder = () => {
    return (
        <div className='container mb-5'>
            <div className='row mb-4 d-flex' id='custom-order'>
                <div className="col-md-6 mb-4">
                    <h1 className='text-dark fs-lg my-3'>Don't woooory I accecpt custom order</h1>
                    <p className="lead text-muted">Take some hours</p>
                    <p className="lead text-muted">Extra money depend on your requirement</p>
                    <p className="lead text-muted">Take some hours</p>
                    <h3 className="text-primary">Please Contact with me for details</h3>
                    <p className="lead">Phone 1: 01222222222 </p>
                    <p className="lead">Phone 2: 01222222222 </p>
                    <p className="lead">Email : email@gmail.com </p>
                </div>
                <div className="col-md-6">
                    <img className='img-fluid w-100 mb-4' src="https://img.freepik.com/free-vector/cooking-time-background-with-kitchenware-cookware-objects-realistic_1284-33152.jpg?size=626&ext=jpg&ga=GA1.2.1380690759.1667906269&semt=sph" alt="" />
                </div>
            </div>
        </div>
    );
};

export default CustomOrder;