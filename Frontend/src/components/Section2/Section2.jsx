import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { mockData } from "../../assets/assets";
import { motion } from "framer-motion"; 
import { useInView } from "react-intersection-observer";
import "./Section2.css";

const Section2 = () => {
  const { ref: section1Ref, inView: section1InView } = useInView({
    triggerOnce: false, 
    threshold: 0.2,    
  });

  const { ref: section2Ref, inView: section2InView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  return (
    <div>
      <section className="about_section" ref={section1Ref}>
        <Container>
          <Row>
            <Col lg={{ span: 8, offset: 2 }} className="text-center">
              <motion.h2
                initial={{ opacity: 0, y: 50 }}
                animate={section1InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 1 }}
              >
                The Pizza tastes better when you eat it with your family
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 50 }}
                animate={section1InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                Share the joy of a delicious pizza with your loved ones. 
                Enjoy every bite together in the comfort of your home, 
                making unforgettable memories with every slice.
              </motion.p>
              <motion.a
                href="#explore-menu"
                className="explore-full-menu"
                initial={{ opacity: 0, y: 50 }}
                animate={section1InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                Explore Full Menu
              </motion.a>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="about_wrapper" ref={section2Ref}>
        <Container>
          <Row className="justify-content-md-center">
            {mockData.map((cardData, index) => (
              <Col md={6} lg={4} className="mb-4 mb-md-0" key={index}>
                <motion.div
                  className="about_box text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={section2InView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <div className="about_icon">
                    <img
                      src={cardData.image}
                      className="img-fluid"
                      alt="icon"
                    />
                  </div>
                  <motion.h4
                    initial={{ opacity: 0, y: 50 }}
                    animate={section2InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 1, delay: 0.2 }}
                  >
                    {cardData.title}
                  </motion.h4>
                  <motion.p
                    initial={{ opacity: 0, y: 50 }}
                    animate={section2InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 1, delay: 0.4 }}
                  >
                    {cardData.paragraph}
                  </motion.p>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Section2;
