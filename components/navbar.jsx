import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import { useUser } from "./UserContext";
import { useRouter } from "next/router";

function CustomNavbar({ onNavbarData }) {
  const { user, setUser: setContextUser } = useUser();
  const router = useRouter();
  const logout = () => {
    setContextUser(null);
    sessionStorage.removeItem("user");
    router.push("/");
  };

  const sendDataToParent = (data) => {
    onNavbarData(data);
  };
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
            {user ? (
              <Navbar.Brand href={"../user/" + user._id}>Duolingo</Navbar.Brand>
            ) : (
              <Navbar.Brand href="../">Duolingo</Navbar.Brand>
            )}

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                {user ? (
                  <>
                    <Nav.Link href="../user/">{user.name}</Nav.Link>
                    <Nav.Link onClick={logout}>LogOut</Nav.Link>
                    <NavDropdown title="Levels" id="basic-nav-dropdown">
                      <NavDropdown.Item
                        onClick={() => sendDataToParent("easy")}
                      >
                        easy
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        onClick={() => sendDataToParent("medium")}
                      >
                        medium
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        onClick={() => sendDataToParent("hard")}
                      >
                        hard
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item
                        onClick={() => sendDataToParent("random")}
                      >
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
