import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";

function CustomNavbar({ user }) {
  return (
    <>
      <div id="navbar">
        <Navbar
          expand="lg"
          className="bg-body-custom"
          style={{ backgroundColor: "#89e219" }}
        >
          <Container>
            <Image src="/duolingo.jpg" alt="logo" width={50} height={50} />

            <Navbar.Brand id="titel" href="#home" style={{ color: "#4b4b4b" }}>
              Duolingo
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                {user ? (
                  <>
                    <Nav.Link href="../user">{user}</Nav.Link>
                    <Nav.Link href="../">LogOut</Nav.Link>
                    <NavDropdown title="Levels" id="basic-nav-dropdown">
                      <NavDropdown.Item href="#action/3.1">
                        easy
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.2">
                        medium
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.3">
                        hard
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="#action/3.4">
                        Random
                      </NavDropdown.Item>
                    </NavDropdown>
                  </>
                ) : (
                  <>
                    <Nav.Link href="../register">Register</Nav.Link>
                    <Nav.Link href="../login">LogIn</Nav.Link>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  );
}

export default CustomNavbar;
