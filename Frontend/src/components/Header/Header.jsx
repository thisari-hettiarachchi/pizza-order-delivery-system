import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Pizza from "../../assets/hero-2.png";
import Pizza_slice from "../../assets/pizza-slice.png";
import Tomato from "../../assets/tomato.png";
import Cheese from "../../assets/cheese.png";
import "./Header.css";

const Section1 = () => {
  return (
    <section className="main-section">
      <Container>
        <Row>
          <Col lg={7} className="mb-5 mb-lg-0">
            <div className="position-relative">
              <img src={Pizza} className="img-pizza" alt="Main" />
              <img src={Tomato} className="img-tomato" alt="" />
              <img src={Cheese} className="img-cheese" alt="" />

              <div className="img-pizza-slice-container">
                <img src={Pizza_slice} className="img-pizza_slice" alt="" />
              </div>

              <div className="price-badge">
                <div className="badge-text">
                  <h4 className="only">Only</h4>
                  <h4 className="price">RS.6.99</h4>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={5}>
            <div className="main-text">
              <h1 className="text-white">New Pizza</h1>
              <h2 className="text-white">With Onion</h2>
              <p className="text-white pt-2 pb-4">
                Feugiat primis ligula risus auctor laoreet augue egestas mauris
                viverra tortor in iaculis pretium at magna mauris ipsum primis
                rhoncus feugiat
              </p>
              <Link to="/">
                <button className="btn-order-now">Order now</button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Section1;
