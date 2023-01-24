//Functionality
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useToken } from "./Accounts/Auth";
import Nav from "./Nav";
import LogoutComponent from "./Accounts/Logout";
//Views
import RoomsList from "./Views/RoomsList";
import Main from "./Main";
import Dashboard from "./Views/Dashboard";
import RoomView from "./Views/RoomView";
//Forms
import RoomsForm from "./ModalForms/RoomsForm";
import FurnitureForm from "./ModalForms/FurnitureForm";
import UpdateRoomForm from "./ModalForms/UpdateRoom";
import UpdateForm from "./ModalForms/Update";

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
            <Route path="/new" element={<UpdateForm />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
