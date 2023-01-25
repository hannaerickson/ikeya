import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../Accounts/Auth";

function RoomsList() {
  const { token } = useAuthContext();
  const [list, setList] = useState([]);
  const [query, setQuery] = useState("");
  const [username, setUsername] = useState(null);

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

  useEffect(() => {
    if (username === null) {
      fetch(`${process.env.REACT_APP_ACCOUNTS_HOST}/token`, {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((res) => setUsername(res.account.username));
    }
    fetchData();
  }, [token, username]);

  return (
    <div>
    <br/>
      <h1>Welcome {username}</h1>
      <input
        type="search"
        placeholder="Search by room name"
        className="form-control"
        onChange={(e) => setQuery(e.target.value)}/>
      <br/>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {list?.filter((room) =>
          room.name.toLowerCase().includes(query.toLowerCase())
          ).map((room) => {
            return (
              <div className="col" key={room.id}>
                <div className="card bg-light mb-3 text-center h-100">
                  <div className="card-header"><small className="text-muted">Designed by {room.username}</small></div>
                  <img src={room.picture_url} className="card-img-top card-image" alt="Image"/>
                  <div className="card-body">
                    <h5 className="card-title">{room.name}</h5>
                    <p className="card-text crop-text-1">{room.description}</p>
                  </div>
                  <div className="card-footer">
                    <button className="btn btn-primary">
                      <Link
                        to="/rooms/furniture"
                        state={room.id}
                        style={{textDecoration: "none", color: "white"}}>
                      Furniture
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  );
}

export default RoomsList;
