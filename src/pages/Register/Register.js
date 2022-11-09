import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { AuthContextInfo } from '../../cotext/Authcontext';

const Register = () => {

    const {createUser} = useContext(AuthContextInfo);
    const navigate = useNavigate();
    const from = '/';

    const emailSignInHandle = (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        if(email !== '' && password !== ''){
            createUser(email,password)
            .then(result => {
              const email = result.user.email;
              fetch('http://localhost:5000/jwt', {
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
          <Form onSubmit={emailSignInHandle}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control name='email' type="email" placeholder="Enter email" required />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control name='password' type="password" placeholder="Password" required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Create account
      </Button>
    </Form>  
        </>
    );
};

export default Register;