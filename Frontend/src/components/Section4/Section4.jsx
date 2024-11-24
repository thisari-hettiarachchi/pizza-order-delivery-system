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
                Aliquam a augue suscipit, luctus neque purus ipsum neque undo
                dolor primis libero tempus, blandit a cursus varius luctus neque
                magna
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
