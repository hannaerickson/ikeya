import { useState, useEffect } from "react";
import { useAuthContext } from "../Accounts/Auth";

function RoomsList(props) {
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
  }, []);

    const imageSize = {
      height: 250,
      width: 350,
    };

  return (
//     <>
//     <div>
//       <br />
//       <h1>Rooms</h1>
//       <input
//         type="search"
//         placeholder="Search by room name"
//         className="form-control"
//         onChange={(e) => setQuery(e.target.value)}
//       />
//       <br />
//       <div className="row">
//         <div className="col-sm-6">
//           <div className="card">
//             <div className="card-body">
//               {list?.filter((room) => room.name.includes(query)).map((room) => {
//                   return (
//                     <div key={room.id}>
//                       <h5>{room.name}</h5>
//                       <p>{room.description}</p>
//                     </div>
//                   );
//                   })}
//               <h5 className="card-title">{room.name}</h5>
//               <p className="card-text">{room.description}</p>
//             </div>
//           </div>
//         </div>
//         </div>
//         </div>
//     </>
//   )
// }


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
                  <td><button onClick={() => props.setSelectedRoomId(room.id)}>Furniture</button></td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default RoomsList;
