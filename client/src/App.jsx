import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from "../components/home/home.jsx"
import SignUp from '../components/signup.jsx'
import SignIn from '../components/signin.jsx'
import Profile from '../components/profile.jsx'
function App() {
  return (
     <BrowserRouter>
     <Routes>
         <Route path="/" element={<Home/>}/>
         <Route path="/signin" element={<SignIn/>}/>
         <Route path="/signup" element={<SignUp/>}/>
         <Route path="/userchannel" element={<Profile/>}/>
     </Routes>
     </BrowserRouter>
  )
}

export default App
