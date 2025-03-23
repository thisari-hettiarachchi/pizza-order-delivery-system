import React from "react";
import "./AppDownload.css";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import StoreIOS from "../../assets/app_store.png";
import StoreGoogle from "../../assets/play_store.png";
import DownloadImage from "../../assets/e-shop.png";

const AppDownload = () => {
  return (
    <div className="app-download" id="app-download">
      <section className="shop_section">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="text-center text-lg-start mb-5 mb-lg-0">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: false, amount: 0.2 }}
              >
                <h4>Download mobile App and</h4>
                <h2>save up to 20%</h2>
                <p>
                  Download our mobile app today and start saving on your next purchase. 
                  Enjoy exclusive discounts, easy browsing, and more benefits right at your fingertips.
                </p>
                <Link to="/">
                  <motion.img
                    src={StoreIOS}
                    alt="IOS"
                    className="img-fluid store me-3"
                    whileHover={{ scale: 1.1 }}
                  />
                </Link>
                <Link to="/">
                  <motion.img
                    src={StoreGoogle}
                    alt="Android"
                    className="img-fluid store me-3"
                    whileHover={{ scale: 1.1 }}
                  />
                </Link>
              </motion.div>
            </Col>

            <Col lg={6}>
              <motion.img
                src={DownloadImage}
                alt="e-shop"
                className="img-fluid"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: false, amount: 0.2 }}
              />
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default AppDownload;
