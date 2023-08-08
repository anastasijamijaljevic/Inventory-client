/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
import { useState } from 'react'
import { useEffect } from 'react'
import api from '../../api/api'
import './Rooms.css'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import CreateRoom from '../../components/CreateRoom'
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
  const [showForm, setShowForm] = useState(false);
  const [isRegistered, setIsRegistered] = useState(
    localStorage.getItem('isRegistered') === 'true'
  );
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );


  // Koristi ovo da bi unela podatke stim sto ces koristiti unete podatke umesto '' i 0 (sve osim ImageUrl, to ce morati na poseban nacin da se radi)
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
    Worker: {
      PersonalNumber: '',
      Name: '',
      Surname: '',
      Gender: 0,
      Qualification: '',
    }
  })

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setCreatedRoom((prevRoom) => ({
      ...prevRoom,
      [name]: value,
    }));
  }

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
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createRoom();
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
  };

  const handleInventoryChange = (event, index) => {
    const { name, value } = event.target;
    const updatedInventory = [...createdRoom.Inventory];
    updatedInventory[index][name] = value;
    setCreatedRoom((prevRoom) => ({
      ...prevRoom,
      Inventory: updatedInventory,
    }));
  };


  const createRoom = async () => {
    try {
      const response = await api.post('/api/Room', createdRoom);
      console.log('User created successfully:', response.data);
      // Do something with the response if needed
      getAllRooms();
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const getAllRooms = async () => {
    try {
      const result = await api.get('/api/Room');
      const data = result.data;
      setRooms(data);
      //console.log(data);
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
  // const [imageList,setImageList] = useState([])
  // const [imageUpload,setImageUpload] = useState(null)
  // const imageListRef = ref(storage, "images/")
  // const uploadImage = () => {
  //   if(imageUpload == null) return;
  //   const imageRef = ref(storage, `images/${imageUpload.name}`);
  //   uploadBytes(imageRef, imageUpload).then((snapshoot) => {
  //     getDownloadURL(snapshoot.ref).then((url) => {
  //     setImageList((prev) => [...prev, url])
  //     })
  //   })
  // };

  useEffect(() => {

    // listAll(imageListRef).then((response) => {
    //   response.items.forEach((item) =>{
    //     getDownloadURL(item).then((url) => {
    //       setImageList((prev) => [...prev, url])
    //     })
    //   })
    // })

    getAllRooms();

  }, []);

  

 

  return (
    <>
    <Navbar/>
  
    <div className="room-list-container">
    
      <ul className="room-list">
        {rooms.map((room) => (
          <Link to={`../room/${room.id}`} key={room.id} className="room-link">
            <li className="room-item">
            <div className="room-icon">
              <FaWarehouse size={60} />
              </div>
              <div className="room-name">
               <strong>Name:</strong>{room.name}
              </div>
              <div className='room-info'>
                <strong>Floor:</strong> {room.floor}
              </div>
              <div className='room-info'>
                <strong>Boss:</strong> {room.boss}
              </div>
            
                <div className='room-info'>
                  <strong>Inventory:</strong> {room.inventory[0].Name}
                </div>
              
            </li>
          </Link>
        ))}
      </ul>

      {isRegistered ? (
  <div>
    <div className='buttons-container'>
    <button onClick={() => setShowForm(!showForm)}>Add Room</button>
    <button onClick={handleLogout}>Logout</button> </div>
    {showForm && (
      <form onSubmit={handleSubmit}>
        <label htmlFor="Floor">Floor:</label>
        <input
          type="text"
          placeholder="Floor"
          name="Floor"
          value={createdRoom.Floor}
          onChange={handleFormChange}
        />
        <br />
        <label htmlFor="Boss">Boss:</label>
        <input
          type="text"
          placeholder="Boss"
          name="Boss"
          value={createdRoom.Boss}
          onChange={handleFormChange}
        />
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
          </div>
        ))}
        <button type="submit">Add Room</button>
      </form>
    )}
  </div>
) : (
  <div>
   
    <RegistrationForm setIsRegistered={handleRegistration} />
  </div>
)}
       
      </div>
    
  <Footer/>

</>
  )

}

export default Rooms;