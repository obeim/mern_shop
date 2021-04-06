import React, { useState, useEffect } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import FormContainer from "../component/FormContainer";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userlogin } from "../actions/userActions.js";
import Message from "../component/Message.js";
import Loader from "../component/Loader.js";
const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;
  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userlogin(email, password));
  };
  return (
    <FormContainer>
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      <h1 className='display-5 mb-4 mt-3  '>Login </h1>
      <Form className='my-2 ' onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter Email'
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter Password'
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button type='submit' variant='dark' className='px-4 py-2'>
          Sign In
        </Button>
      </Form>
      <Row className='p-3'>
        <Col>
          New Custmor? {"  "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
