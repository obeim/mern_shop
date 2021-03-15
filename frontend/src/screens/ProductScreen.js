import React from "react";
import products from "../products";
import { LinkContainer } from "react-router-bootstrap";
import Rating from "../Rating";
import { Col, Row, Button, Image, ListGroup, Card } from "react-bootstrap";
const ProductScreen = ({ match }) => {
  const product = products.find((product) => product._id === match.params.id);
  return (
    <>
      <LinkContainer to='/'>
        <Button variant='light' className='my-3'>
          Go Back
        </Button>
      </LinkContainer>
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
            <ListGroup.Item>
              <Button
                variant='dark'
                bg='dark'
                block
                disabled={product.countInStock === 0}
              >
                ADD TO CART
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
