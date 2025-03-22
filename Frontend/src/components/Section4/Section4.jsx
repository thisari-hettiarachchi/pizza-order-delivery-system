import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Section4.css";

const Section4 = () => {
  return (
    <div>
      <section className="contact_section">
        <Container>
          <Row className="justify-content-center">
            <Col sm={8} className="text-center">
              <h4>We Guarantee</h4>
              <h2>30 Minutes Delivery!</h2>
              <p>
                We ensure that your order will reach you within 30 minutes, 
                so you can enjoy your pizza at its best—hot, fresh, and ready to eat.
              </p>
                <button className="call-now">Call: 999-888-7777</button>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Section4;
