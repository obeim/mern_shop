import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import Rating from "../Rating";
import { Col, Row, Button, Image, Form, ListGroup } from "react-bootstrap";
import { listProductDetails } from "../actions/productActions.js";
import Loader from "../component/Loader";
import Message from "../component/Message";

const ProductScreen = ({ match, history }) => {
  const [qty, setQty] = useState(1);
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
    // eslint-disable-next-line
  }, [dispatch, match]);
  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };
  return (
    <>
      <LinkContainer to='/'>
        <Button variant='light' className='my-3'>
          Go Back
        </Button>
      </LinkContainer>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <Col md={6} lg={6}>
            <Image src={product.image} fluid></Image>
          </Col>
          <Col md={6} lg={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.price}
                  text={`${product.numReviews} review`}
                />
              </ListGroup.Item>
              <ListGroup.Item>
                <strong> Price </strong>: ${product.price}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong> Descrption </strong>: {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={12} lg={3}>
            <ListGroup>
              <ListGroup.Item>
                <Row>
                  <Col>Price: </Col>
                  <Col>${product.price}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>

              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty :</Col>
                    <Col>
                      <Form.Control
                        as='select'
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option value={x + 1} key={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Button
                  variant='dark'
                  bg='dark'
                  block
                  disabled={product.countInStock === 0}
                  onClick={addToCartHandler}
                >
                  ADD TO CART
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
