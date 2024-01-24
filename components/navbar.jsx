import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

function CustomNavbar({ user }) {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Duolingo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user ? (
              <>
                <Nav.Link href="../user">{user}</Nav.Link>
                <Nav.Link href="../">LogOut</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="../register">Register</Nav.Link>
                <Nav.Link href="../login">LogIn</Nav.Link>
              </>
            )}
            <NavDropdown title="Levels" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">easy</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">medium</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">hard</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Random</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
