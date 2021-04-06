import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Col,
  Row,
  Button,
  Image,
  ListGroup,
  Form,
  Card,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Message from "../component/Message";
import { addToCart, removeFromCart } from "../actions/cartActions";
const CartScreen = ({ match, location, history }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const productID = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const reomveFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  useEffect(() => {
    if (productID) {
      dispatch(addToCart(productID, qty));
    }
  }, [dispatch, productID, qty]);
  return (
    <>
      <Row className='my-4'>
        <Col md={8}>
          <h2>Shopping Cart</h2>
          {cartItems.length === 0 ? (
            <Message>
              no items in the cart <Link to='/'>go back</Link>
            </Message>
          ) : (
            <ListGroup className='my-3' variant='flush'>
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as='select'
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option value={x + 1} key={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        variant='light'
                        type='button'
                        onClick={() => reomveFromCartHandler(item.product)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card className='p-2'>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                {" "}
                <h2>
                  {" "}
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  ) Items
                </h2>
                $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  block
                  variant='dark'
                  disabled={cartItems.length === 0}
                >
                  PROCCED TO CHECKOUT
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CartScreen;
