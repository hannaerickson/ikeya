import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../Accounts/Auth";
import { useLocation } from "react-router-dom";

function UpdateRoomForm() {
  const { token } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [picture_url, setPictureUrl] = useState("");
  const [room_id, setRoomId] = useState("");
  const [username, setUserName] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [setShow] = useState(true);
  const handleClose = () => setShow(false);

  const handleRoomChange = (e) => {
    setRoomId(e.target.value);};
  const handleNameChange = (e) => {
    setName(e.target.value);};
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);};
  const handlePictureChange = (e) => {
    setPictureUrl(e.target.value);};

  const fetchData = async () => {
    const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/rooms/me`;
    const response = await fetch(url, {
      headers: {Authorization: `Bearer ${token}`,},
    });
    if (response.ok) {
      const data = await response.json();
      setRooms(data);
    }
  };

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
    fetchData();
  }, [username]);

  async function handleSubmit(e) {
    e.preventDefault();
    const data = { name, description, picture_url, username };
    const furnitureUrl = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/rooms/${room_id}`;
    const response = await fetch(furnitureUrl, {
      method: "PUT",
      credentials: "include",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const newFurniture = await response.json();
      setName("");
      setDescription("");
      setPictureUrl("");
      setUserName();
      handleClose();
      window.location.reload();
    }
  };

  return (
    <div className="row">
        <div className="p-3">
          <h1>Update Your Room</h1>
          <br/>
          <form onSubmit={handleSubmit} id="update-room-form">
            <div className="form-floating mb-3">
              <input
                onChange={handleNameChange}
                placeholder="Name"
                required
                type="text"
                name="name"
                id="name"
                value={name}
                className="form-control"
              />
              <label htmlFor="name">Room Name</label>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="description">Description</label>
              <textarea
                onChange={handleDescriptionChange}
                placeholder="Updated description"
                required
                type="textarea"
                name="description"
                id="description"
                value={description}
                className="form-control"
              />
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handlePictureChange}
                placeholder="picture_url"
                required
                type="text"
                name="picture_url"
                id="picture_url"
                value={picture_url}
                className="form-control"
              />
              <label htmlFor="picture_url">Picture URL</label>
            </div>
            <div className="mb-3">
              <select
                onChange={handleRoomChange}
                required
                name="room_id"
                id="room_id"
                value={room_id}
                className="form-select"
              >
                <option value="">Which room would you like to update?</option>
                {rooms.map((room) => {
                  return (
                    <option value={room.id} key={room.id}>
                      {room.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <button className="btn btn-outline-warning d-block mx-auto">
              Update!
            </button>
          </form>
        </div>
      </div>
  );
};

export default UpdateRoomForm;
