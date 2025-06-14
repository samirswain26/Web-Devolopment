import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login from './components/Login.jsx';
import {BrowserRouter, Routes, Route} from "react-router"
import Signup from './components/Signup.jsx';
import Signout from './components/Signout.jsx';
import Homepage from './components/Homepage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage/>} />
        <Route path='/Signup' element={<Signup/>} />
        <Route path='/Login' element={<Login/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
