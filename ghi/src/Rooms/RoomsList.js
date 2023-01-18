import { useState, useEffect } from "react";
import { useAuthContext } from "../Accounts/Auth";

function RoomsList() {
  const [list, setList] = useState([]);
  const { token } = useAuthContext();

  const fetchData = async () => {
    const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/rooms`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      const data = await response.json();
      setList(data);
    }
  };

  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchData();
  }, [token]);

    const imageSize = {
      height: 250,
      width: 350,
    };

  return (
    <div>
      <br />
      <h1>Rooms</h1>
      <input
        type="search"
        placeholder="Search by room name"
        className="form-control"
        onChange={(e) => setQuery(e.target.value)}
      />
      <br />
      <table className="table table-striped">
        <thead>
          <tr className="table-success">
            <th>NAME</th>
            <th>DESCRIPTION</th>
            <th>URL</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {list
            ?.filter((room) => room.name.includes(query))
            .map((room) => {
              return (
                <tr key={room.id}>
                  <td>{room.name}</td>
                  <td>{room.description}</td>
                  <td><img style={imageSize} className="list-images img-thumbnail" src={room.picture_url}/></td>
                  <td><button className="btn btn-info">Furniture</button></td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default RoomsList;
