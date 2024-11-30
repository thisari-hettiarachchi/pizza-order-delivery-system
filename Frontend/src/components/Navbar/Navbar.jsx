import React, { useState, useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";
import { assets } from "../../assets/assets";
import "./Navbar.css";

const Navbars = ({ setShowLogin, setFormType }) => {
  const { getTotalItems, getTotalPrice } = useContext(StoreContext);
  const [nav, setNav] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token")); // Track login state

  const totalItems = getTotalItems();

  const changeValueOnScroll = () => {
    const scrollValue = document?.documentElement?.scrollTop;
    scrollValue > 100 ? setNav(true) : setNav(false);
  };

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", changeValueOnScroll);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    setIsLoggedIn(false); // Update login state
    alert("You have been logged out.");
    navigate("/");
  };

  return (
    <div>
      <header>
        <Navbar
          collapseOnSelect
          expand="lg"
          className={`${nav === true ? "sticky" : ""}`}
        >
          <Container>
            <Navbar.Brand href="#home">
              <Link to="/" className="logo">
                <img src={assets.logo} alt="Logo" className="img-fluid" />
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ms-auto">
                <Link to="/" onClick={scrollTop}>
                  Home
                </Link>
                <a href="#explore-menu">Menu</a>
                <a href="#app-download">Mobile-app</a>
                <a href="#contact-us">Contact-us</a>
                <Nav.Link as={Link} to="/">
                  <div className="cart">
                    <i className="bi bi-bag"></i>
                    {totalItems > 0 && (
                      <span className="cart-count">{totalItems}</span>
                    )}
                    <span className="cart-price">
                      Rs.{getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                </Nav.Link>

                {!isLoggedIn ? (
                  <>
                    <button
                      onClick={() => {
                        setShowLogin(true);
                        setFormType("Login");
                      }}
                      className="sign-in-button"
                    >
                      SIGN-IN
                    </button>

                    <button
                      onClick={() => {
                        setShowLogin(true);
                        setFormType("Sign Up");
                      }}
                      className="sign-up-button"
                    >
                      SIGN-UP
                    </button>
                  </>
                ) : (
                  <div className="navbar-profile">
                    <img src={assets.profile_icon} alt="Profile Icon" />
                    <ul className="nav-profile-dropdown">
                      <li>
                        <img src={assets.bag_icon} alt="Bag Icon" />
                        <p>Order</p>
                      </li>
                      <hr />
                      <li onClick={handleLogout}>
                        <img src={assets.logout_icon} alt="Logout Icon" />
                        <span>Log Out</span>
                      </li>
                    </ul>
                  </div>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </div>
  );
};

export default Navbars;
