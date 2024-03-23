
import React from "react";
import { Link } from "react-router-dom";
import { Container, Navbar, Nav, Form, Row, Col } from "react-bootstrap";

export const NavigationBar = ({ user, onLoggedOut }) => {

  //nav bar
  return (
    <Navbar className="mb-2" bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          MyFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user ? (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/users">
                  Signup
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/">
                  Movies
                </Nav.Link>

                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>

                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>

              </>
            )}
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );

};