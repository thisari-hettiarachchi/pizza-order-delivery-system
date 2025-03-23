import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion"; 
import { useInView } from 'react-intersection-observer'; 
import PromotionImage from "../../assets/pro.png";
import './Section3.css';

const Section3 = () => {
  const { ref: promotionRef, inView: promotionInView } = useInView({
    triggerOnce: false,  
    threshold: 0.2,     
  });

  const { ref: parallaxRef, inView: parallaxInView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  return (
    <div>
      <>
        <section className="promotion_section" ref={promotionRef}>
          <Container>
            <Row className="align-items-center">
              <Col lg={6} className="text-center mb-5 mb-lg-0">
                <motion.img
                  src={PromotionImage}
                  className="img-fluid"
                  alt="Promotion"
                  initial={{ opacity: 0, x: -50 }}
                  animate={promotionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                  transition={{ duration: 1 }}
                />
              </Col>
              <Col lg={6} className="px-5">
                <motion.h2
                  initial={{ opacity: 0, y: 50 }}
                  animate={promotionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 1 }}
                >
                  Nothing brings people together like a good Pizza
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 50 }}
                  animate={promotionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 1, delay: 0.2 }}
                >
                  Always a great place for enjoying together, the fun continues as 
                  you savor the best moments with great pizza. With a lively atmosphere, 
                  great ingredients, and the joy that comes with every bite, it’s 
                  hard to resist the magic of pizza.
                </motion.p>
                <motion.ul
                  initial={{ opacity: 0, y: 50 }}
                  animate={promotionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 1, delay: 0.4 }}
                >
                  <li>
                    <motion.p
                      initial={{ opacity: 0, y: 50 }}
                      animate={promotionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                      transition={{ duration: 1, delay: 0.6 }}
                    >
                      Pizza is the ultimate comfort food that brings people together, 
                      offering delicious moments and shared joy.
                    </motion.p>
                  </li>
                  <li>
                    <motion.p
                      initial={{ opacity: 0, y: 50 }}
                      animate={promotionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                      transition={{ duration: 1, delay: 0.8 }}
                    >
                      Crispy crust and smooth textures make each slice a delightful experience.
                    </motion.p>
                  </li>
                  <li>
                    <motion.p
                      initial={{ opacity: 0, y: 50 }}
                      animate={promotionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                      transition={{ duration: 1, delay: 1 }}
                    >
                      Every bite brings a world of flavor that satisfies your cravings.
                    </motion.p>
                  </li>
                </motion.ul>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="bg_parallax_scroll" ref={parallaxRef}>
          <motion.div
            className="parallax-background"
            initial={{ opacity: 0 }}
            animate={parallaxInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1 }}
          >
          </motion.div>
        </section>
      </>
    </div>
  );
}

export default Section3;
