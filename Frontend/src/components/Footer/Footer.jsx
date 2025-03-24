import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Footer.css";
import Cards from "../../assets/Cards.png";
import { assets } from "../../assets/assets";
import { motion } from "framer-motion";

function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const listenToScroll = () => {
    let heightToHidden = 250;
    const windowScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    windowScroll > heightToHidden ? setIsVisible(true) : setIsVisible(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
  });

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <>
      <footer>
        <Container>
          <Row>
            <Col sm={6} lg={3} className="mb-4 mb-lg-0">
              <motion.div
                className="text-center"
                initial="hidden"
                whileInView="visible"
                variants={fadeInUp}
                viewport={{ once: false, amount: 0.3 }}
              >
                <h5>Location</h5>
                <p>55/05 Duplication Road,</p>
                <p>Kollupitiya</p>
                <p>Sri Lanka</p>
              </motion.div>
            </Col>

            <Col sm={6} lg={3} className="mb-4 mb-lg-0">
              <motion.div
                className="text-center"
                initial="hidden"
                whileInView="visible"
                variants={fadeInUp}
                viewport={{ once: false, amount: 0.3 }}
              >
                <h5>Working Hours</h5>
                <p>Mon-Fri: 9:00AM - 10:00PM</p>
                <p>Saturday: 10:00AM - 8:30PM</p>
                <p>Sunday: 12:00PM - 5:00PM</p>
              </motion.div>
            </Col>

            <Col sm={6} lg={3} className="mb-4 mb-lg-0">
              <motion.div
                className="text-center"
                initial="hidden"
                whileInView="visible"
                variants={fadeInUp}
                viewport={{ once: false, amount: 0.3 }}
              >
                <h5>Order Now</h5>
                <p>
                  Enjoy quick and hassle-free ordering with just a few taps.
                </p>
                <p>
                  <Link to="tel:9998887777" className="calling" id="contact-us">
                    0112-123-153
                  </Link>
                </p>
                <img src={Cards} className="Cards" alt="" />
              </motion.div>
            </Col>

            <Col sm={6} lg={3} className="mb-4 mb-lg-0">
              <motion.div
                className="text-center"
                initial="hidden"
                whileInView="visible"
                variants={fadeInUp}
                viewport={{ once: false, amount: 0.3 }}
              >
                <h5>Follow Us</h5>
                <p>
                  Stay connected with us for the latest updates, exclusive
                  offers, and exciting news.
                </p>
                <ul className="list-unstyled text-center mt-2">
                  <li>
                    <Link to="/">
                      <i className="bi bi-facebook"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <i className="bi bi-twitter"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <i className="bi bi-instagram"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <i className="bi bi-youtube"></i>
                    </Link>
                  </li>
                </ul>
              </motion.div>
            </Col>
          </Row>

          <Row className="copy_right">
            <Col>
              <motion.div
                initial="hidden"
                whileInView="visible"
                variants={fadeInUp}
                viewport={{ once: false, amount: 0.3 }}
              >
                <ul className="list-unstyled text-center mb-0">
                  <li>
                    <Link to="/" className="text-decoration-none">
                      © 2024 RED OVEN All Rights Reserved
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="text-decoration-none">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="text-decoration-none">
                      Terms Of Use
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="text-decoration-none">
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </footer>

      {isVisible && (
        <motion.div
          className="scroll_top"
          onClick={scrollTop}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <i className="bi bi-arrow-up"></i>
        </motion.div>
      )}
    </>
  );
}

export default Footer;
