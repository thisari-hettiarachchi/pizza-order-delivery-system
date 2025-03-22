import React, { useState, useContext, useEffect } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { assets } from "../../assets/assets";
import "./Navbar.css";

const Navbars = () => {
  const [nav, setNav] = useState(false);
  const location = useLocation();
  const isNotHomePage = location.pathname !== "/";


  return (
    <div>
      <header>
        <Navbar
          collapseOnSelect
          expand="lg"
          className={`${nav || isNotHomePage ? "sticky" : ""}`}
        >
          <Container>
            <Navbar.Brand>
              <Link to="/" className="logo">
                <img src={assets.logo} alt="logo" className="img-fluid" />
              </Link>
            </Navbar.Brand>
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ms-auto">
                <div className="navbar-profile">
                  <ul className="profile-username-container">
                  </ul>
                </div>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </div>
  );
};

export default Navbars;
