import React, { useState } from "react";
import { Navbar, Container, Nav, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut, token, }) => {

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as ={Link} to="/">
          MyFlix App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* If we don't have a user, show links to login and sign-up view */}
            {!user && (
              <>
              <Nav.Link as={Link} to="/login">
              Login
              </Nav.Link>
              <Nav.Link as={Link} to="/signup">
                Register
              </Nav.Link>
              </>
            )}
            {/* If we have a user, show links to home, profile and logout */}
            {user && (
              <>
              <Nav.Link as ={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/profile">
                Profile
              </Nav.Link>
              <Nav.Link onClick={onLoggetOut}>Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};