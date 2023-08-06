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



const Rooms = () => {
  const { id } = useParams();
  const [rooms, setRooms] = useState([]);


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

    getAllRooms();

  }, []);

  

 

  return (
    <>
    <div className="room-list-container">
      <h1>Rooms</h1>
      <ul className="room-list">
        {rooms.map((room) => (
          <Link to={`../room/${room.id}`} key={room.id} className="room-link">
            <li className="room-item">
              <div>
                {room.name}
              </div>
              <div>
                <strong>Floor:</strong> {room.floor}
              </div>
              <div>
                <strong>Boss:</strong> {room.boss}
              </div>
              <div>
                <strong>Inventory:</strong> {room.inventory.name}
              </div>
            </li>
          </Link>
        ))}
      </ul>


      <div>
        <button onClick={createRoom}>Add Room</button>
      </div>

      {/* <div>
        <input 
        type="file" 
        onChange={(e) => {
          setImageUpload(e.target.files[0]);
           }} />
        <button onClick={uploadImage}>Upload Image</button>

        {imageList.map((url) => {
          return <img style={{width:300 , height:100}} src={url} />
        })}
        
      </div> */}
    </div>
   
  

</>
  )

}

export default Rooms;