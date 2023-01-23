import { React, useState } from "react";
import { Modal } from "react-bootstrap";
import { LoginForm, SignupForm } from "../ModalForms/Modal";
import { Button } from "react-bootstrap";

export default function SideBar() {
  const [show, setShow] = useState(false);
  const { handleSubmit } = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          type="button"
          variant="outline-success"
          size="lg"
          onClick={handleShow}
        >
          Login
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <LoginForm handleSubmit={handleSubmit} />
          </Modal.Body>
        </Modal>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          type="button"
          variant="outline-success"
          size="lg"
          onClick={handleShow}
        >
          Signup
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <SignupForm handleSubmit={handleSubmit} />
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}
