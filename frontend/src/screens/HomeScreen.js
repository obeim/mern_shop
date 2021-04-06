import React, { useEffect } from "react";
import { listProducts } from "../actions/productActions.js";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import Product from "../component/Product";
import Loader from "../component/Loader.js";
import Message from "../component/Message.js";
const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { products, error, loading } = productList;
  useEffect(() => {
    dispatch(listProducts());
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <h1 className='my-4'> Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant={"danger"} children={error} />
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};
export default HomeScreen;
