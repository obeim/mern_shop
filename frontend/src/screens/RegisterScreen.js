import React, { useState, useEffect } from "react";
import FormContainer from "../component/FormContainer";
import { Form, Button, Row, Col } from "react-bootstrap";
import Loader from "../component/Loader";
import Message from "../component/Message";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";
import { Link } from "react-router-dom";

const RegisterScreen = ({ location, history }) => {
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("passwords does not match");
    } else {
      setMessage(null);
      dispatch(register(name, email, password));
    }
  };
  return (
    <FormContainer>
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      {message && <Message variant='danger'>{message}</Message>}

      <h1 className='display-5 mb-4 mt-3  '>Register </h1>
      <Form className='my-2 ' onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter your name'
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='text'
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
        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='confirm Password'
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <Button type='submit' variant='dark' className='px-4 py-2'>
          Sign In
        </Button>
      </Form>
      <Row className='p-3'>
        <Col>
          Have account? {"  "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/register"}>
            sign in
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
