import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RoomsList from "./Rooms/RoomsList";
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
        </Routes>
      </div>
    </BrowserRouter>
    // </AuthProvider>
  );
}

export default App;
