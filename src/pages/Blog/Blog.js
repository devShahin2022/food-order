import React from 'react';
import Footer from '../../components/Footer/Footer';
import Menubar from '../../components/Navbar/Menubar';
import useTitle from '../../Hooks/useTitle';

const Blog = () => {
    // title load
    useTitle('blog');
    return (
        <>
        <Menubar></Menubar>
        <div className='px-2 py-5 bg-white'>
            <h1 className='display-2 text-dark text-center'>Latest questions</h1>
            
        </div>
        <div className="container">
                <img className='img-fluid w-100 mb-5'  src="https://img.freepik.com/premium-photo/ask-question-online-concept-businessman-hand-hold-interface-question-marks-sign-web-question-marks-drawn-black-background-concept-searching-answer-uncertainty-problem-solving_162459-1817.jpg?size=626&ext=jpg&ga=GA1.2.1380690759.1667906269&semt=sph" alt="" />
            </div>
            <div className="container">
            <h1 className='text-dark my-4'>Difference between SQL and NoSQL</h1>
            <p className="lead text-muted">
            When it comes to choosing a database the biggest decisions is picking a relational (SQL) or non-relational (NoSQL) data structure. While both the databases are viable options still there are certain key differences between the two that users must keep in mind when making a decision.<br/> <br/>

        </p>
        <p className="lead text-muted">
            <b>Main difference</b>
            <li>Type</li>
            <li>Language </li>
            <li>Scalability</li>
            <li>Structure </li>
            <li>Property followed </li>
            <li>Support</li>
        </p>
            <h1 className='text-dark my-4'>What is JWT, and how does it work?</h1>
            <p className="lead text-muted">JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed.</p>
            <p className="lead text-muted">
            JWTs differ from other web tokens in that they contain a set of claims. Claims are used to transmit information between two parties. What these claims are depends on the use case at hand. For example, a claim may assert who issued the token, how long it is valid for, or what permissions the client has been granted.

            A JWT is a string made up of three parts, separated by dots (.), and serialized using base64. In the most common serialization format, compact serialization, the JWT looks something like this: xxxxx.yyyyy.zzzzz.

            Once decoded, you will get two JSON strings:

            The header and the payload.
            The signature. 
            The JOSE (JSON Object Signing and Encryption) header contains the type of token — JWT in this case — and the signing algorithm.  

            The payload contains the claims. This is displayed as a JSON string, usually containing no more than a dozen fields to keep the JWT compact. This information is typically used by the server to verify that the user has permission to perform the action they are requesting.

            There are no mandatory claims for a JWT, but overlaying standards may make claims mandatory. For example, when using JWT as bearer access token under OAuth2.0, iss, sub, aud, and exp must be present. some are more common than others. 

            The signature ensures that the token hasn’t been altered. The party that creates the JWT signs the header and payload with a secret that is known to both the issuer and receiver, or with a private key known only to the sender. When the token is used, the receiving party verifies that the header and payload match the signature.
                    </p>
                    <h1 className='text-dark my-4'>What is the difference between javascript and NodeJS?</h1>
                    <p className="lead text-muted">JavaScript is a simple programming language that can be used with any browser that has the JavaScript Engine installed. Node. js, on the other hand, is an interpreter or execution environment for the JavaScript programming language.</p>
                    <h1 className='text-dark my-4'>How does NodeJS handle multiple requests at the same time?</h1>
                    <p className="lead text-muted">How NodeJS handle multiple client requests? NodeJS receives multiple client requests and places them into EventQueue. NodeJS is built with the concept of event-driven architecture. NodeJS has its own EventLoop which is an infinite loop that receives requests and processes them.</p>
        </div>        
        <Footer></Footer>
        </>
        
    );
};

export default Blog;