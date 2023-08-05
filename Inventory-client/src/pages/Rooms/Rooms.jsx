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