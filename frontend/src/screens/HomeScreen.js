import React from "react";
import { Col, Row } from "react-bootstrap";
import products from "../products";
import Product from "../component/Product";
const HomeScreen = () => {
  return (
    <>
      <h1 className='my-4'> Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};
export default HomeScreen;
