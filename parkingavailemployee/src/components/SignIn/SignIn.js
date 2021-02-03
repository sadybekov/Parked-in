import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/Container";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Redirect } from 'react-router-dom';
import './SignIn.css';
import { Formik } from 'formik'; 
import * as yup from 'yup';

class SignIn extends React.Component {
   constructor (props) {
        super(props);
    
        this.state = {
            email: '',
            password: '',
            redirect: null,
            signInMessage: '' 

        }  
    }

    //On change attribute for email text box
    onEmailChange = (event) => {

        this.setState({email: event.target.value});            
    }

    //On password attribute for password text box
    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
    }
    
    onSubmitSignIn = () => {
        // Call/signin passing email address and password in the request body, POST, returns a user object.
        const postOptions = {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        }

        fetch('/signincouch', postOptions)
            .then(response => response.json())
            .then(user =>{
                if (user._id) {
                    this.props.loadUser(user);
                    this.props.setSignIn(true);
                    this.setState({signInMessage:''})
                    this.redirectToParkingLots();
        
                }
                /* else {
                    this.props.setSignIn(false);
                    this.setState({signInMessage:'The user email and/or password is invalid'})
                } */  
            })
            .catch(err => {
                this.props.setSignIn(false);
                    this.setState({signInMessage:'The user email and/or password is invalid'})

            })

        


        /* const user = {
            id: 1,
            name: 'Bob',
            email: 'rocketman@gmail.com'
        }
        // const user = null;

        if (user) {
            this.props.loadUser(user);
            this.props.setSignIn(true);
            this.setState({signInMessage:''})
            this.redirectToParkingLots();

        }
        else {
            this.props.setSignIn(false);
            this.setState({signInMessage:'The user email and/or password is invalid'})
        } */
        
    }

    redirectToParkingLots = () => {            
        // Changing the value redirect         
        this.setState({ redirect: "/parkingavailemployee/parkinglots"});
    } 

    render () {
        if (this.state.redirect) {
            return  <Redirect to={{ pathname: this.state.redirect }}/>
        }
        //email and password validation rules using "yup"
        const schema = yup.object({
            email: yup.string()
                        .email("Invalid email address format")
                        .required("Email is required"),
            password: yup.string()
                        .min(4, "Password must be 4 characters at minimum")
                        .required("Password is required")          
            });

        return (
        
            <Container fluid style={{backgroundColor: '#D4F1F4'}}>
                <Row>
                <Col>
                    <Row>
                        <Col className= "mt-2" lg={12}>
                            <div className = "signInMessage">{this.state.signInMessage}</div>
                        </Col>
                    </Row>                    
                    <Row>
                    <Col xs ={7} md={4} lg={4} className = "mt-2 mb-3">                  
                        <Formik
                            validationSchema={schema}
                            onSubmit={values =>
                                {
                                    this.setState({email:values.email, password: values.password});
                                    this.onSubmitSignIn();
                                }} 
                            initialValues={{
                            email: "",
                            password: ""
                            }}
                        >
                            {({
                                handleSubmit,
                                handleChange,
                                handleBlur,
                                values,
                                touched,
                                isValid,
                                errors,
                            }) => (                               
                                <Form noValidate onSubmit = {handleSubmit}>
                                    <Form.Group controlId="formBasicEmail">

                                    <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" name = "email" placeholder="Enter email" onChange = {handleChange} value = {values.email} isInvalid={!!errors.email}/>
                                        <Form.Control.Feedback type="invalid">
                                        {errors.email}
                                        </Form.Control.Feedback>
                                    </Form.Group>


                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" name = "password" placeholder="Password" onChange = {handleChange} value = {values.password} isInvalid={!!errors.password}/>
                                        <Form.Control.Feedback type="invalid">
                                        {errors.password}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Button type = "submit" variant="primary">Sign In</Button>
                                </Form>
                            )}
                        </Formik>
                    </Col>
                    </Row>
                </Col>
                </Row>
                
            </Container>
        );

    }

}

export default SignIn ;
