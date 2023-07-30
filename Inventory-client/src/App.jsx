import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import AboutUs from './components/AboutUs'
import GetStarted from './components/GetStarted'
import RegistrationForm from './pages/RegistrationForm'
import LoginForm from './pages/LoginForm'

function App() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    axios.get("http://localhost:5209/api/Inventory")
    .then((Response = AxiosResponse) =>{
      console.log(Response);
    })
  }, []);

  return (
    <>
   
    <Home/>
  
    </>
  )
}

export default App
