import { useState, useEffect } from 'react';

function RoomsList() {
    const [list, setList] = useState([]);

    const fetchData = async () => {
        const url = 'http://localhost:8000/api/rooms';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data)
            setList(data);
        } else {
            alert("Oops! Something went wrong");
        }
    }

    const [query, setQuery] = useState('')

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <div>
            <br/>
            <h1>Rooms</h1>
            <input type="search" placeholder="Search by room name" className="form-control" onChange={(e)=>setQuery(e.target.value)} />
            <br/>
            <table className="table table-striped">
                <thead>
                    <tr className="table-success">
                        <th>NAME</th>
                        <th>DESCRIPTION</th>
                        <th>URL</th>
                    </tr>
                </thead>
                <tbody>
                    {list?.filter((room) =>
                    room.name.includes(query)
                    ).map(room => {
                       return (
                            <tr key={room.id}>
                                <td>{room.name}</td>
                                <td>{room.description}</td>
                                <td>{room.picture_url}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default RoomsList;
