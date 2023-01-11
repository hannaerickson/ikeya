import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RoomsList from "./Rooms/RoomsList";
import LoginForm from './Accounts/LoginForm';
// import { AuthProvider } from './token';

// function GetToken() {
//     // Get token from JWT cookie (if already logged in)
//     useToken();
//     return null
// }

function App() {
  return (
    // <AuthProvider>
      // <GetToken />
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/rooms" element={<RoomsList />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </div>
    </BrowserRouter>
    // </AuthProvider>
  );
}

export default App;
