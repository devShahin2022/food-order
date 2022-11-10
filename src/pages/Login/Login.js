import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Menubar from '../../components/Navbar/Menubar';
import { AuthContextInfo } from '../../cotext/Authcontext';

const Login = () => {
    const {signIn, providerLogin} = useContext(AuthContextInfo);
    const navigate = useNavigate();
    const from = '/';
    const emailLoginHandle = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.email.value;
        if(email !== '' && password !== ''){
            signIn(email, password)
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
            alert("password or username required!");
        }
    }

    const googleProvider = new GoogleAuthProvider();
    const handleGoogleLogin = () => {
        providerLogin(googleProvider)
        .then(result => {
            console.log('user email', result.user.email);
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
        });
    }

    return (
  <>
      <Menubar></Menubar>
      <div className="container">
        <h1 className='fs-lg text-info py-5 text-center'>
          Login
        </h1>
        <div className='m-auto my-3 border border-1 rounded px-2 py-4' style={{"max-width" : "500px"}}>
        <Form onSubmit={emailLoginHandle}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control name='email' type="email" placeholder="Enter email" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control name='password' type="password" placeholder="Password" required />
        </Form.Group>
        <Button variant="primary" className='btn btn-primary w-100 my-2' type="submit">
          Login
        </Button>
      </Form>
      <button onClick={handleGoogleLogin} className='btn btn-light text-primary w-100 py-2 mt-5'>Login with google</button>
      
        </div>
        </div>
      {/* footer */}

      <Footer></Footer>
      </>  
    );
};

export default Login;