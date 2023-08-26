/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
import { useState } from 'react'
import { useEffect } from 'react'
import api from '../../api/api'
import './Rooms.css'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { storage } from '../../firebase'
import {ref , uploadBytes , listAll , getDownloadURL} from 'firebase/storage'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import LoginForm from '../Login/LoginForm'
import RegistrationForm from '../Register/RegistrationForm'
import { FaWarehouse } from 'react-icons/fa';




const Rooms = () => {
  const { id } = useParams();
  const [rooms, setRooms] = useState([]);
  const [workers, setWorkers] = useState([])
  const [imageUpload,setImageUpload] = useState(null)
  const [showForm, setShowForm] = useState(false);
  const [roomCreated,setRoomCreated] = useState(false)
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false); 
  const [showModal, setShowModal] = useState(false);

  const [isRegistered, setIsRegistered] = useState(
    localStorage.getItem('isRegistered') === 'true'
  );

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  const [createdRoom, setCreatedRoom] = useState({
    Name: '',
    Floor: 0,
    Width: 0,
    Length: 0,
    Height: 0,
    Boss: '',
    Inventory: [{
      Name: '',
      SerialNumber: 0,
      Mark: '',
      Model: '',
      Quantity: 0,
      Price: 0,
      ImageUrl: "kelly-sikkema-tk9RQCq5eQo-unsplash.jpg",
      RoomId: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
    }],
    Worker: null
  })


  const getAllWorkers = async () => {
    try {
      const result = await api.get("/api/Worker");
      const data = result.data;
      setWorkers(data);
      console.log(data)
    }
    catch (error) {
      console.log(error)
    }
  }



  const UpdateWorker = async (roomId) => {
    try {
      const response = await api.put(`/api/Room/${roomId}/worker`, {workerId: selectedWorker?.id}, {
        headers: {
          'Content-Type': 'application/json'
        },
      });
      console.log('Boss added successfully:', response.data);
      setSelectedWorker(null); 
    } catch (error) {
      console.error('Error adding Boss:', error);
    }
  };



  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setCreatedRoom((prevRoom) => ({
      ...prevRoom,
      [name]: value,
    }));
  }



  const uploadImage = async () => {
    if(imageUpload == null) return;

    try{
    const imageRef = ref(storage, `images/${imageUpload.name}`);
    await uploadBytes(imageRef, imageUpload);
    
  }
  catch(error){
    console.error('Error uploading image to Firebase:', error);
    }
  };



  const handleAddInventory = () => {
    setCreatedRoom((prevRoom) => ({
      ...prevRoom,
      Inventory: [
        ...prevRoom.Inventory,
        {
          Name: '',
          SerialNumber: 0,
          Mark: '',
          Model: '',
          Quantity: 0,
          Price: 0,
          ImageUrl: '',
          RoomId: id, 
        },
      ],
    }));
    setIsExpanded(true);
  };



  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await createRoom();
    const roomId = result.inventory[0].roomId

    if(selectedWorker){
      await UpdateWorker(roomId)
    }

    await uploadImage();

    setShowForm(false);

    setCreatedRoom({
      ...createdRoom,
      Name: '',
      Floor: 0,
      Boss: '',
      Inventory: [
        {
          Name: '',
          SerialNumber: 0,
          Mark: '',
          Model: '',
          Quantity: 0,
          Price: 0,
          ImageUrl: '',
          RoomId: id,
        },
      ],
    });

    setRoomCreated(true)
  };



  const handleInventoryChange = (event, index) => {
    const { name, value } = event.target;
    const updatedInventory = [...createdRoom.Inventory];
    updatedInventory[index][name] = value;
    if(name === 'Image'){
      const fileName = event.target.files[0]?.name;
    if (fileName) {
      updatedInventory[index].ImageUrl = fileName;
    }
    }
    setCreatedRoom((prevRoom) => ({
      ...prevRoom,
      Inventory: updatedInventory,
    }));
  };



  const createRoom = async () => {
    try {
      const response = await api.post('/api/Room', createdRoom);
      console.log('User created successfully:', response.data);
      const data = response.data;
      getAllRooms();
      return data;
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };



  const getAllRooms = async () => {
    try {
      const result = await api.get('/api/Room');
      const data = result.data;
      setRooms(data);
    } catch (error) {
      console.log('Error fetching rooms:', error);
    }
  };



  const handleRegistration = () => {
    setIsRegistered(true);
    setIsLoggedIn(true);
    setShowForm(false);
  };


  const handleLogout = () => {
    localStorage.removeItem('isRegistered');
    localStorage.removeItem('isLoggedIn');
    setIsRegistered(false);
    setIsLoggedIn(false);
  };

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  const handleToggleRegistrationForm = () => {
    setShowModal(!showModal);
  };

  

  
  useEffect(() => {
    getAllRooms();
    getAllWorkers();

    if(roomCreated){
      setRoomCreated(false);
    }

  }, [roomCreated]);

  

 

  return (
  <>
    <Navbar/>
    <div className="room-list-container">
      <h1>Rooms</h1>
      {isRegistered && (
  <ul className="room-list">
    {rooms.map((room) => (
      <Link to={`../room/${room.id}`} key={room.id} className="room-link">
        <li className="room-item">
          <div className="room-icon">
            <FaWarehouse size={60} />
          </div>
          <div className='room-name'>
            {room.name}
          </div>
          <div className='room-info'>
            <strong>Floor:</strong> {room.floor}
          </div>
          <div className='room-info'>
            <strong>Boss:</strong> {room.boss}
          </div>
          {/* Ostatak koda za prikaz informacija o sobi */}
        </li>
      </Link>
    ))}
  </ul>
)}

      {isRegistered ? (
      <div>
        <div className='buttons-container'>
        <button onClick={handleToggleForm}>Add room</button>
        <button onClick={handleLogout}>Log Out</button> </div>
        {showForm && (
          <div className={`room-form ${showForm ? 'active' : ''} ${isExpanded ? 'expanded' : ''}`}>
          <form onSubmit={handleSubmit}>
          <label htmlFor="Name">Name:</label>
          <input
            type="text"
            placeholder="Name"
            name="Name"
            value={createdRoom.Name}
            onChange={handleFormChange}
          />
          <br />
          <label htmlFor="Floor">Floor:</label>
          <input
            type="text"
            placeholder="Floor"
            name="Floor"
            value={createdRoom.Floor}
            onChange={handleFormChange}
          />
          <br />
          <label htmlFor="Width">Width:</label>
          <input
            type="text"
            placeholder="Width"
            name="Width"
            value={createdRoom.Width}
            onChange={handleFormChange}
          />
          <br />
          <label htmlFor="Length">Length:</label>
          <input
            type="text"
            placeholder="Length"
            name="Length"
            value={createdRoom.Length}
            onChange={handleFormChange}
          />
          <br />
          <label htmlFor="Height">Height:</label>
          <input
            type="text"
            placeholder="Height"
            name="Height"
            value={createdRoom.Height}
            onChange={handleFormChange}
          />
          <br />

          <label htmlFor="Boss">Boss:</label>
          <select
              id="selectedWorker"
              value={selectedWorker?.id || ''}
              onChange={(e) => {
                const selectedId = e.target.value;
                const selectedWorker = workers.find(worker => worker.id === selectedId)

                if(selectedWorker && selectedWorker.qualification === "Worker"){
                  setSelectedWorker(selectedWorker)
                }
                else{
                  setSelectedWorker(null);
                }
              }}
            >
              <option value="">Select a Boss</option>
              {workers
              .filter(worker => worker.qualification === "Worker")
              .map(worker => (
                <option key={worker.id} value={worker.id}>
                  {`${worker.name} ${worker.surname}`}
                </option>
              ))}
            </select>
            <br />

        {createdRoom.Inventory.map((item, index) => (
          <div key={index}>
            <h3>Inventory Item {index + 1}</h3>
            <input
              type="text"
              placeholder="Item Name"
              name="Name"
              value={item.Name}
              onChange={(event) => handleInventoryChange(event, index)}
            />
             <input
              type="text"
              placeholder="Item SerialNumber"
              name="SerialNumber"
              value={item.SerialNumber}
              onChange={(event) => handleInventoryChange(event, index)}
            />
             <input
              type="text"
              placeholder="Item Mark"
              name="Mark"
              value={item.Mark}
              onChange={(event) => handleInventoryChange(event, index)}
            />
             <input
              type="text"
              placeholder="Item Model"
              name="Model"
              value={item.Model}
              onChange={(event) => handleInventoryChange(event, index)}
            />
             <input
              type="text"
              placeholder="Item Quantity"
              name="Quantity"
              value={item.Quantity}
              onChange={(event) => handleInventoryChange(event, index)}
            />
             <input
              type="text"
              placeholder="Item Price"
              name="Price"
              value={item.Price}
              onChange={(event) => handleInventoryChange(event, index)}
            />
            <label htmlFor="Image">Image</label>
            <input 
              type="file" 
              name='Image'
              onChange={(event) => {
                setImageUpload(event.target.files[0]);
                handleInventoryChange(event,index)
                }} />
            </div>
        ))}
        <button type='button' onClick={handleAddInventory}>Add new Inventory</button>
        <button type="submit">Add Room</button>
      </form>
      </div>
      )}
      </div>
      
      ) : (

        <div>
        <button onClick={handleToggleRegistrationForm} className='btnRegister'>Register</button>
        {showModal && (
          <div className="registration-modal-overlay">
            <div className="registration-modal-content">
              <RegistrationForm setIsRegistered={handleRegistration} />
            </div>
          </div>
        )}
      </div>

      )}

    </div>
    <Footer/>
  </>
  )
}

export default Rooms;