import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../Accounts/Auth";
import { useLocation } from "react-router-dom";

const UpdateRoomForm = () => {
  const { token } = useContext(AuthContext);
  const location = useLocation();
  const roomData = location.state;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [picture_url, setPictureUrl] = useState("");
  const [room_id, setRoomId] = useState("");
  const [username, setUserName] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [show, setShow] = useState(true);

  const handleRoomChange = (event) => {
    setRoomId(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePictureChange = (event) => {
    setPictureUrl(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
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
      console.log(newFurniture);

      setName("");
      setDescription("");
      setPictureUrl("");
      setUserName();
      handleClose();
      window.location.reload();
    }
  };

  const handleClose = () => setShow(false);

  const fetchData = async () => {
    const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/rooms/me`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1 style={{ fontSize: "25px" }}>Update Your Room</h1>
          <form onSubmit={handleSubmit} id="create-furniture-form">
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
              <label htmlFor="name">Name</label>
            </div>
            <div className="form-floating mb-3">
              <textarea
                onChange={handleDescriptionChange}
                placeholder="picture_url"
                required
                type="text"
                name="picture_url"
                id="picture_url"
                value={description}
                className="form-control"
              />
              <label htmlFor="picture_url">Description</label>
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
              <label htmlFor="picture_url">Picture</label>
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
            <button className="btn btn-outline-success d-block mx-auto">
              Update!
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateRoomForm;
