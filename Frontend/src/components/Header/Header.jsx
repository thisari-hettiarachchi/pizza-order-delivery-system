import React from "react";
import { Carousel, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Pizza from "../../assets/hero-2.png";
import Pizza_2 from "../../assets/pizza2.png";
import Tomato from "../../assets/tomato.png";
import Cheese from "../../assets/cheese.png";
import ItalianPizza from "../../assets/Italianpizza.png";
import "./Header.css";

const Header = () => {
  return (
    <Carousel interval={5000} pause={false} className="custom-carousel">
      <Carousel.Item>
        <section className="main-section-1">
          <Container>
            <Row>
              <Col lg={7} className="mb-5 mb-lg-0">
                <div className="position-relative">
                  <img src={Pizza} className="img-pizza" alt="Main" />
                  <img src={Tomato} className="img-tomato" alt="Tomato" />
                  <img src={Cheese} className="img-cheese" alt="Cheese" />

                  <div className="price-badge">
                    <div className="badge-text">
                      <h4 className="only">Only</h4>
                      <h4 className="price">RS.899.00</h4>
                    </div>
                  </div>
                </div>
              </Col>
              <Col lg={5}>
                <div className="main-text">
                  <h1 className="text-white">New Pizza</h1>
                  <h2 className="text-white">With Onion</h2>
                  <p className="text-white pt-2 pb-4">
                  Try our new pizza with a flavorful onion topping, 
                  freshly made to satisfy your taste buds. Perfectly paired with our signature 
                  ingredients for an unforgettable experience.
                  </p>
                  <Link to="/">
                    <button className="btn-order-now">Order now</button>
                  </Link>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </Carousel.Item>

      <Carousel.Item>
        <section className="main-section-2">
          <Container>
            <Row>
              <img src={Pizza_2} className="img-pizza" alt="Main" />

              <Col lg={5}>
                <div className="main-text">
                  <img
                    src={ItalianPizza}
                    className="img-italian-pizza"
                    alt=""
                  />
                  <p className="desc">
                    The Only Original Italian Woodfired Oven Pizzas in Sri Lanka
                  </p>
                  <p className="call-now">Call - 99 999 999</p>
                  <div className="button-container">
                    <button className="menu">
                      <a href="#explore-menu">Menu</a>
                    </button>
                    <button className="about-us">
                      <a href="#contact-us">About us</a>
                    </button>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </Carousel.Item>

      <Carousel.Item>
        <section className="main-section-3">
          <Container>
            <Row>
              <img src={Pizza} className="img-pizza" alt="Main" />

              <Col lg={5}>
                <div className="main-text">
                  <h2>Want something Hot & Spicy</h2>
                  <p className="desc">
                    Checkout our brand-new Italian Devilled Chicken & Italian
                    Spicy 4 Chicken Pizzas
                  </p>
                  <p className="call-now">Call - 99 999 999</p>
                  <div className="button-container">
                    <button className="menu">
                      <a href="#explore-menu">About more</a>
                    </button>
                    <button className="about-us">
                      <a href="#contact-us">Add to cart</a>
                    </button>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </Carousel.Item>
    </Carousel>
  );
};

export default Header;
