import React from 'react';
import Footer from '../../components/Footer/Footer';
import Menubar from '../../components/Navbar/Menubar';

const Blog = () => {
    return (
        <>
        <Menubar></Menubar>
        <div className='px-2 py-5 bg-white'>
            <h1 className='fs-lg text-dark text-center'>Latest questions</h1>
            
        </div>
        <div className="container">
            <img className='img-fluid w-100 mb-5'  src="https://img.freepik.com/premium-photo/ask-question-online-concept-businessman-hand-hold-interface-question-marks-sign-web-question-marks-drawn-black-background-concept-searching-answer-uncertainty-problem-solving_162459-1817.jpg?size=626&ext=jpg&ga=GA1.2.1380690759.1667906269&semt=sph" alt="" />
        </div>
        <Footer></Footer>
        </>
        
    );
};

export default Blog;