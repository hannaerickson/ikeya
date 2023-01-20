//Functionality
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useToken } from "./Accounts/Auth";
import Nav from "./Nav";
import LogoutComponent from "./Accounts/Logout";
//Views
import RoomsList from "./Rooms/RoomsList";
import Main from "./Main";
import Dashboard from "./Rooms/Dashboard";
import RoomView from "./Rooms/RoomView";
//Forms
import RoomsForm from "./Rooms/RoomsForm";
import FurnitureForm from "./Furniture/FurnitureForm";
import UpdateRoomForm from "./Rooms/UpdateRoom";

function GetToken() {
  // Get token from JWT cookie (if already logged in)
  useToken();
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GetToken />
        <Nav />
        <div className="container">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/rooms" element={<RoomsList />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/logout" element={<LogoutComponent />} />
            <Route path="/rooms/:room_id" element={<RoomView />} />
            <Route path="/roomsform" element={<RoomsForm />} />
            <Route path="/updateRoomForm" element={<UpdateRoomForm />} />
            <Route path="/furniture" element={<FurnitureForm />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
