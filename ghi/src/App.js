import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoomsList from "./Rooms/RoomsList";
import Nav from "./Nav";
import Main from "./Main";
import Dashboard from "./Rooms/Dashboard";
import { AuthProvider, useToken } from "./Accounts/Auth";
import LogoutComponent from "./Accounts/Logout";
import RoomView from "./Rooms/RoomsView";
import FurnitureForm from "./Furniture/FurnitureForm";

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
            <Route path="/furniture" element={<FurnitureForm />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
