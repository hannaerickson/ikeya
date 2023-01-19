import React from "react";
import { useState, useEffect } from "react";
import { useAuthContext } from "../Accounts/Auth";

function RoomsForm() {
    const { token } = useAuthContext();
    const [name, setName] = useState(""); 
    const [description, setDescription] = useState(""); 
    const [picture_url, setPictureUrl] = useState(""); 
    const [username, setUserName] = useState(""); 

    useEffect(() => {
    fetchData();
    setUserName("tbyrd");
    }, []);


    const fetchData = async () => {
    const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/token`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      const accountData = await response.json();
    //   setUserName(accountData[0].username);
    //   console.log("Account Data", accountData);
    }
  };

    const submit = async (name, description, picture_url, username) => {
        // e.preventDefault(); Prevents the page from refreshing on submit
        const urlSubmit = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/rooms`;
        console.log(name, description, picture_url, username);
        const resp = await fetch(urlSubmit, {
            headers: { Authorization: `Bearer ${token}` },
            method: "POST",
            body: JSON.stringify({
                name: name,
                description: description,
                picture_url: picture_url,
                username: username
            }),
        });
        const data = await resp.json();
        fetchData();
    };

    return (
      <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Submit A New Room</h1>
                        <form id="create-room-form">
                            <div className="form-floating mb-3">
                                <input placeholder="name" required type="text" name="name" id="name" value = { name } onChange={(e) => setName(e.target.value)} className="form-control" />
                                <label htmlFor="name">Room Name</label>
                            </div>
                            {/* <div className="form-floating mb-3">
                                <input placeholder="description" required type="textarea" rows="5" name="description" id="description" className="form-control" />
                                <label htmlFor="name">Description</label>
                            </div> */}
                            <div className="form-group mb-3">
                                <label htmlFor="Description">Description:</label>
                                <textarea className="form-control" placeholder="Description" required type="textarea" rows="4" name="description" id="description" value = { description } onChange={(e) => setDescription(e.target.value)}></textarea>
                            </div>
                            <div className="form-floating mb-3">
                                <input placeholder="picture_url" required type="url" name="picture_url" id="picture_url" value = { picture_url } onChange={(e) => setPictureUrl(e.target.value)} className="form-control" />
                                <label htmlFor="name">Picture URL</label>
                            </div>
                            <button onClick={()=> submit()} className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div >
        </div >
  );
}
export default RoomsForm;