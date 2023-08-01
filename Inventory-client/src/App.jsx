import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { useEffect } from 'react'
import axios from 'axios'
import api from './api/api'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Rooms from './pages/Rooms/Rooms'

import Home from './pages/Home/Home'
import AboutUs from './pages/AboutUs/AboutUs';
import GetStarted from './components/GetStarted'
import RegistrationForm from './pages/Register/RegistrationForm'
import LoginForm from './pages/Login/LoginForm'
import Error404 from './pages/Error404/error404'
import RoomPage from './pages/Room/RoomPage'


function App() {
  const [count, setCount] = useState(0)
  const [inventory, setInventory] = useState({});
  const [createdInventory, setCreatedInventory] = useState({
    Name: '',
    SerialNumber: 0,
    Mark: '',
    Model: '',
    Quantity: '',
    Price: 0,
    RoomId: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
  })
  const [createdWorker, setCreatedWorker] = useState({
    PersonalNumber: '',
    Name: '',
    Surname: '',
    Gender: 0,
    Qualification: '',
    RoomId: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
  })
  const [createdRoom, setCreatedRoom] = useState({
    Name: '',
    Floor: 0,
    Width: 0,
    Length: 0,
    Height: 0,
    Boss: '',
    Inventory: {
      Name: '',
      SerialNumber: 0,
      Mark: '',
      Model: '',
      Quantity: '',
      Price: 0,
      RoomId: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
    },
    Worker: {
      PersonalNumber: '',
      Name: '',
      Surname: '',
      Gender: 0,
      Qualification: '',
      RoomId: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
    }
  })



  //Inventory Methods
  const getAllInventories = async () => {
    try {
      const result = await api.get("/api/Inventory");
      const data = result.data;
      setInventory(data);
      console.log(data)
    }
    catch (error) {
      console.log(error)
    }
  }

  const getInventoryById = async (id) => {
    try {
      const result = await api.get(`/api/Inventory/${id}`);
      const data = result.data;
      setInventory(data);
      console.log(data)
    }
    catch (error) {
      console.log(error)
    }
  }

  const createInventory = async () => {
    // e.preventDefault();
    try {
      const response = await api.post('/api/Inventory', createdInventory);
      console.log('User created successfully:', response.data);
      // Do something with the response if needed
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const deleteInventory = async (id) => {
    try {
      await axios.delete(`/api/Inventory/${id}`);
      console.log('User deleted successfully');
      getAllInventories(); // Refresh the list of users after deletion
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const UpdateInventory = async (id) => {
    try {
      const response = await axios.put(`/api/users/${id}`, createdInventory);
      console.log('User updated successfully:', response.data);
      getAllInventories(); // Refresh the list of users after update
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleChange = (e) => {
    setCreatedInventory({ ...createdInventory, [e.target.name]: e.target.value });
  };



  //Worker Methods
  const getAllWorkers = async () => {
    try {
      const result = await api.get("/api/Worker");
      const data = result.data;
      setInventory(data);
      console.log(data)
    }
    catch (error) {
      console.log(error)
    }
  }

  const getWorkerById = async (id) => {
    try {
      const result = await api.get(`/api/Worker/${id}`);
      const data = result.data;
      setInventory(data);
      console.log(data)
    }
    catch (error) {
      console.log(error)
    }
  }


  const createWorker = async () => {
    // e.preventDefault();
    try {
      const response = await api.post('/api/Worker', createdWorker);
      console.log('User created successfully:', response.data);
      // Do something with the response if needed
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const deleteWorker = async (id) => {
    try {
      await axios.delete(`/api/Worker/${id}`);
      console.log('User deleted successfully');
      getAllWorkers(); // Refresh the list of users after deletion
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };



  //Room Methods
  const getAllRooms = async () => {
    try {
      const result = await api.get("/api/Room");
      const data = result.data;
      setInventory(data);
      console.log(data)
    }
    catch (error) {
      console.log(error)
    }
  }

  const getRoomById = async (id) => {
    try {
      const result = await api.get(`/api/Room/${id}`);
      const data = result.data;
      setInventory(data);
      console.log(data)
    }
    catch (error) {
      console.log(error)
    }
  }


  const createRoom = async () => {
    // e.preventDefault();
    try {
      const response = await api.post('/api/Room', createdRoom);
      console.log('User created successfully:', response.data);
      // Do something with the response if needed
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const deleteRoom = async (id) => {
    try {
      await axios.delete(`/api/Room/${id}`);
      console.log('User deleted successfully');
      getAllRooms(); // Refresh the list of users after deletion
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };


  useEffect(() => {
    //getAllInventories();
    //getInventoryById("d74e3a55-7a36-428c-a2f7-5360a1c643ee");
   // getAllWorkers();
    //getAllRooms();
  }, []);


  // useEffect(() => {
  //   axios.get("http://localhost:5209/api/Inventory")
  //   .then((Response = AxiosResponse) =>{
  //     console.log(Response);
  //   })
  // }, []);



  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/rooms' element={<Rooms />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/register' element={<RegistrationForm />} />
        <Route path='*' element={<Error404 />} />
        <Route path="/room/:id" element={<RoomPage/>} />
      </Routes>


<Rooms />


    </>
  )
}

export default App
