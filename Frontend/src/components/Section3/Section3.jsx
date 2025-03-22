import React from 'react'
import { Container, Row, Col } from "react-bootstrap";
import PromotionImage from "../../assets/pro.png";
import './Section3.css'

const Section3 = () => {
  return (
    <div>
      <>
        <section className="promotion_section">
          <Container>
            <Row className="align-items-center">
              <Col lg={6} className="text-center mb-5 mb-lg-0">
                <img
                  src={PromotionImage}
                  className="img-fluid"
                  alt="Promotion"
                />
              </Col>
              <Col lg={6} className="px-5">
                <h2>Nothing brings people together like a good Pizza</h2>
                <p>
                  Always a great place for enjoying together, the fun continues as 
                  you savor the best moments with great pizza. With a lively atmosphere, 
                  great ingredients, and the joy that comes with every bite, it’s 
                  hard to resist the magic of pizza.
                </p>
                <ul>
                  <li>
                    <p>
                      Pizza is the ultimate comfort food that brings people together, 
                      offering delicious moments and shared joy.
                    </p>
                  </li>
                  <li>
                    <p>Crispy crust and smooth textures make each slice a delightful experience.</p>
                  </li>
                  <li>
                    <p>
                      Every bite brings a world of flavor that satisfies your cravings.
                    </p>
                  </li>
                </ul>
              </Col>
            </Row>
          </Container>
        </section>

        {/* BG Parallax Scroll */}
        <section className="bg_parallax_scroll"></section>
      </>
    </div>
  );
}

export default Section3
