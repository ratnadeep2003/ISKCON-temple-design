import Login from './components/Login'
import Users from './components/Users';
import Sidebar from './components/Sidebar';
import DarshanGallery from './components/DarshanGallery';
import CalendarPage from './components/Callender';
import BookStore from './components/BookStore';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: "flex", minHeight: "100vh", alignItems: "stretch" }}>
  <Sidebar />
  <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/users" element={<Users />} />
            <Route path="/darshan" element={<DarshanGallery />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/bookstore" element={<BookStore />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
export default App
