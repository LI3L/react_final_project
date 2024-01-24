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
            <Nav.Link href="../">Home</Nav.Link>
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
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
