import React, { useState, useContext } from "react";
import { Navbar, NavbarBrand } from "react-bootstrap";
import { AuthContext } from "../Accounts/Auth";
import { LoginForm } from "../ModalForms/LoginForm";
import { SignupForm } from "../ModalForms/SignupForm";
import { Modal } from "react-bootstrap";
import "../CSS/Style.css";
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse,
} from "mdb-react-ui-kit";


export default function Nav() {
  const { token, login } = useContext(AuthContext);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showNavColorSecond, setShowNavColor] = useState(false);
  const { handleSubmit } = useState();

  const handleCloseLogin = () => setShowLoginModal(false);
  const handleShowLogin = () => setShowLoginModal(true);
  const handleCloseSignup = () => setShowSignupModal(false);
  const handleShowSignup = () => setShowSignupModal(true);

  return (
    <MDBNavbar className="MDBNavbar py-0" expand="lg" dark bgColor="dark">
      <MDBContainer fluid>
        <Navbar>
          <NavbarBrand className="NavbarBrand" href="/">
            IKEYA
          </NavbarBrand>
        </Navbar>
        <MDBNavbarToggler
          type="button"
          data-target="#navbarColor02"
          aria-controls="navbarColor02"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowNavColor(!showNavColorSecond)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar>
          {!!token && (
            <MDBNavbarNav>
              <MDBNavbarLink href="/rooms">All Rooms</MDBNavbarLink>

              <MDBNavbarLink href="/dashboard">My Rooms</MDBNavbarLink>
            </MDBNavbarNav>
          )}

          <MDBNavbarNav className="d-flex justify-content-end">
            {!!token ? (
              <MDBNavbarLink className="ml-auto" href="/logout">
                Logout
              </MDBNavbarLink>
            ) : (
              <>
                <MDBNavbarLink className="ml-auto" onClick={handleShowLogin}>
                  Login
                </MDBNavbarLink>
                <Modal show={showLoginModal} onHide={handleCloseLogin}>
                  <Modal.Body>
                    <LoginForm handleSubmit={handleSubmit} />
                  </Modal.Body>
                </Modal>
                <MDBNavbarLink className="ml-auto" onClick={handleShowSignup}>
                  Signup
                </MDBNavbarLink>
                <Modal show={showSignupModal} onHide={handleCloseSignup}>
                  <Modal.Body>
                    <SignupForm handleSubmit={handleSubmit} />
                  </Modal.Body>
                </Modal>
              </>
            )}
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
