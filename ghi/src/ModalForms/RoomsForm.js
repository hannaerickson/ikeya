import React, { useState, useEffect } from "react";
import { useAuthContext } from "../Accounts/Auth";

function RoomsForm() {
  const { token } = useAuthContext();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [picture_url, setPictureUrl] = useState("");
  const [username, setUserName] = useState(null);
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);

  const fetchConfig = {
    method: "GET",
    credentials: "include",
  };

  useEffect(() => {
    if (username === null) {
      fetch(`${process.env.REACT_APP_ACCOUNTS_HOST}/token`, fetchConfig)
        .then((res) => res.json())
        .then((res) => setUserName(res.account.username));
    }
  }, [username]);

  async function handleSubmit(e) {
    e.preventDefault();
    const room = { name, description, picture_url, username };
    const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/rooms`;
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(room),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      setName("");
      setDescription("");
      setPictureUrl("");
      handleClose();
      window.location.reload();
    }
  }

  return (
    <div className="row">
      <div className="p-3">
        <h1>New Room</h1>
        <br />
        <label htmlFor="name">Room Name</label>
        <div className="mb-3">
          <input
            placeholder="Name your room"
            required
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            onFocus={(event) => (event.target.style.opacity = 1)}
            onBlur={(event) => (event.target.style.opacity = 0.5)}
          />
        </div>
        <label htmlFor="description">Description</label>
        <div className="form-group mb-3">
          <textarea
            className="form-control"
            placeholder="Add unique information about your room"
            required
            type="textarea"
            rows="4"
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onFocus={(event) => (event.target.style.opacity = 1)}
            onBlur={(event) => (event.target.style.opacity = 0.5)}
          ></textarea>
        </div>
        <label htmlFor="name">Picture URL</label>
        <div className="mb-3">
          <input
            placeholder="Add a picture url for your room"
            required
            type="url"
            name="picture_url"
            id="picture_url"
            value={picture_url}
            onChange={(e) => setPictureUrl(e.target.value)}
            onFocus={(event) => (event.target.style.opacity = 1)}
            onBlur={(event) => (event.target.style.opacity = 0.5)}
            className="form-control"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="btn btn-orange d-block mx-auto"
        >
          Create!
        </button>
      </div>
    </div>
  );
}
export default RoomsForm;
