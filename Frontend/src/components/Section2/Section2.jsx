import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { mockData } from "../../assets/assets";
import "./Section2.css";

const Section2 = () => {
  return (
    <div>
      <>
        <section className="about_section">
          <Container>
            <Row>
              <Col lg={{ span: 8, offset: 2 }} className="text-center">
                <h2>
                  The Pizza tastes better when you eat it with your family
                </h2>
                <p>
                  Share the joy of a delicious pizza with your loved ones. 
                  Enjoy every bite together in the comfort of your home, 
                  making unforgettable memories with every slice.
                </p>
                <a href="#explore-menu" className="explore-full-menu">
                  Explore Full Menu
                </a>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="about_wrapper">
          <Container>
            <Row className="justify-content-md-center">
              {mockData.map((cardData, index) => (
                <Col md={6} lg={4} className="mb-4 mb-md-0" key={index}>
                  <div className="about_box text-center">
                    <div className="about_icon">
                      <img
                        src={cardData.image}
                        className="img-fluid"
                        alt="icon"
                      />
                    </div>
                    <h4>{cardData.title}</h4>
                    <p>{cardData.paragraph}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      </>
    </div>
  );
};

export default Section2;
