import Login from './components/Login'
import Users from './components/Users';
import Sidebar from './components/Sidebar';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import './App.css'

function App() {


  return (
    <BrowserRouter>
    <Sidebar/>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path='/users' element={<Users/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
