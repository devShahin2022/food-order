import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Menubar from '../../components/Navbar/Menubar';
import { AuthContextInfo } from '../../cotext/Authcontext';
import useTitle from '../../Hooks/useTitle';

const Register = () => {

    const {createUser} = useContext(AuthContextInfo);
    const navigate = useNavigate();
    const from = '/';

    // title load
    useTitle('Register');

    const emailSignInHandle = (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        if(email !== '' && password !== ''){
            createUser(email,password)
            .then(result => {
              const email = result.user.email;
              fetch('https://assignment11-back-end.vercel.app/jwt', {
                method : "POST",
                headers : {
                  'content-type' : 'application/json'
                },
                body : JSON.stringify({email})
                })
                .then(res => res.json())
                .then(data => {
                  console.log(data)
                  localStorage.setItem('jwt', data.token);
                })
                .catch(error => console.log(error));
              navigate(from,{replace: true});
            })
            .catch(error => {
                console.log(error);
            })
        }else{
            alert("please fill the form correctly");
        }
    }
    return (
        <>
        {/* header */}
        <Menubar></Menubar>

        <h1 className='fs-lg text-info py-5 text-center'>
          Sign up with email and password
        </h1>
        <div className='m-auto my-3 border border-1 rounded px-2 py-4' style={{"max-width" : "500px"}}>

        <Form onSubmit={emailSignInHandle}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control name='email' type="email" placeholder="Enter email" required />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control name='password' type="password" placeholder="Password" required />
      </Form.Group>
      <Button variant="primary" className='w-100 my-3' type="submit">
        Create account
      </Button>
          </Form>  

        </div>

    {/* footer */}

    <Footer></Footer>

        </>
    );
};

export default Register;