import React from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import './login.css'
import { login, signUp } from "../../utils/Auth";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";



const Login = () => {
 
  const {user,setUser,setLoggedIn} =useAuth() 
  const navigate =useNavigate()
  const handleSignUp = async () => {
    try {
      await signUp(user.email, user.password);
      alert("User created successfully!");
    } catch (error) {
      console.error(error.message);
    }
  };


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        await login(user.email, user.password);
        console.log("Login Successful");
        setLoggedIn(true)
        navigate("/workFlowTable")
    } catch (error) {
        console.error("Login Error:", error.message);
    }
};


  return (
    <Container fluid className="vh-100 d-flex align-items-center background">
      <Row className="w-100">
        <Col md={6} className="d-none d-md-flex align-items-center justify-content-center text-dark left" >
          <div className="text-center text-white p-4 rounded ">
            <div className="d-flex align-items-center justify-content-left gap-2">
              <img src="/assets/images/highbridge.svg" alt="HighBridge Logo" className="highbridge" />
              <h3 className="fw-bold">HighBridge</h3>
            </div>
            <div className="top-5">
              <h3>Building the Future...</h3>
              <p className="w-300 text-left">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>

          </div>
        </Col>

        <Col md={6} className="d-flex align-items-center justify-content-center right ">
          <div className="p-4 shadow-lg rounded bg-light" style={{ width: "90%", maxWidth: "400px" }} >
            <h4 className="fw-bold mb-3">WELCOME BACK!</h4>
            <h5 className="mb-4">Log In to your Account</h5>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Type here..." value={user.email} onChange={(e)=> setUser({...user,email:e.target.value})} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Type here..."  value={user.password} onChange={(e)=> setUser({...user,password:e.target.value})}/>
              </Form.Group>

              <div className="d-flex justify-content-between mb-3">
                <Form.Check type="checkbox" label="Remember me" />
                <a href="#" className="text-black">Forgot Password?</a>
              </div>

              <Button variant="danger" className="w-100 mb-3" onClick={handleLogin}>Log In</Button>

              <Button variant="outline-secondary" className="w-100 mb-2 d-flex justify-content-left gap-5">
                <img src="/assets/images/google.svg"/> Log in with Google
              </Button>
              <Button variant="outline-secondary" className="w-100 mb-2 d-flex justify-content-left gap-5">
              <img src="/assets/images/facebook.svg"/> Log in with Facebook
              </Button>
              <Button variant="outline-secondary" className="w-100 d-flex justify-content-left gap-5">
              <img src="/assets/images/apple.svg"/> Log in with Apple
              </Button>
            </Form>

            <p className="mt-3 text-center">
              New User? <a href="#" className="text-black signup" onClick={(e)=> {e.preventDefault();handleSignUp()}}>SIGN UP HERE</a>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
