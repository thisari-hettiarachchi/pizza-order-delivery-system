import React from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <motion.div 
      className="explore-menu" 
      id="explore-menu"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.2 }}
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false }}
      >
        Explore our menu
      </motion.h1>

      <Row>
        <Col lg={{ span: 8, offset: 2 }} className="text-center">
          <motion.p
            className="explore-menu-text"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: false }}
          >
            Explore our menu and find a pizza for every craving! From classic
            flavors to unique creations, we have something delicious for
            everyone. Dive in and discover your next favorite slice!
          </motion.p>
        </Col>
      </Row>

      <motion.div
        className="explore-menu-list"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={{
          visible: { transition: { staggerChildren: 0.2 } },
        }}
      >
        {menu_list.map((item, index) => {
          const isLeft = index % 2 === 0; 
          return (
            <motion.div
              key={index}
              className="explore-menu-list-item"
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                )
              }
              initial={{ opacity: 0, x: isLeft ? -100 : 100 }} 
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: false }}
              whileHover={{ scale: 1.1 }}
            >
              <motion.img
                className={category === item.menu_name ? "active" : ""}
                src={item.menu_image}
                alt=""
                whileHover={{ scale: 1.1 }}
              />
              <p>{item.menu_name}</p>
            </motion.div>
          );
        })}
      </motion.div>
      <hr />
    </motion.div>
  );
};

export default ExploreMenu;
