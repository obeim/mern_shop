import React from "react";
import { Container, Button } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./component/Header";
import Footer from "./component/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
const App = () => {
  return (
    <Router>
      <Header />
      <Container>
        <main>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/product/:id' component={ProductScreen} />
        </main>
      </Container>
      <Footer />
    </Router>
  );
};

export default App;
