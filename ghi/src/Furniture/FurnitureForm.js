import React from "react";

class FurnitureForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      picture_url: "",
      room_id: "",
      rooms: [],
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePictureChange = this.handlePictureChange.bind(this);
    this.handleRoomChange = this.handleRoomChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event) {
    const value = event.target.value;
    this.setState({ name: value });
  }

  handlePictureChange(event) {
    const value = event.target.value;
    this.setState({ picture_url: value });
  }

  handleRoomChange(event) {
    const value = event.target.value;
    this.setState({ room_id: value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { name, picture_url, room_id } = this.state;
    const data = { name, picture_url, room_id };
    console.log(data);

    const furnitureUrl = "http://localhost:8000/api/furniture/";
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(furnitureUrl, fetchConfig);
    if (response.ok) {
      const newFurniture = await response.json();
      console.log(newFurniture);

      const cleared = {
        name: "",
        picture_url: "",
        room_id: "",
      };
      this.setState(cleared);
    }
  }

  async componentDidMount() {
    const url = "http://localhost:8000/api/rooms/";

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      this.setState({ rooms: data });
    }
  }
  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create some new furniture</h1>
            <form onSubmit={this.handleSubmit} id="create-furniture-form">
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleNameChange}
                  placeholder="Name"
                  required
                  type="text"
                  name="name"
                  id="name"
                  value={this.state.name}
                  className="form-control"
                />
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={this.handlePictureChange}
                  placeholder="picture_url"
                  required
                  type="text"
                  name="picture_url"
                  id="picture_url"
                  value={this.state.picture_url}
                  className="form-control"
                />
                <label htmlFor="picture_url">Picture URL</label>
              </div>
              <div className="mb-3">
                <select
                  onChange={this.handleRoomChange}
                  required
                  name="room_id"
                  id="room_id"
                  value={this.state.room_id}
                  className="form-select"
                >
                  <option value="">Choose a room</option>
                  {this.state.rooms.map((room) => {
                    return (
                      <option value={room.id} key={room.id}>
                        {room.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default FurnitureForm;
