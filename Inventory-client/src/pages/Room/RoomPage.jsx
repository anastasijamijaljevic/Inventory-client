/* eslint-disable react/jsx-key */
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import api from '../../api/api'
import { storage } from '../../firebase'
import {ref , uploadBytes , listAll , getDownloadURL} from 'firebase/storage'
import { printInventoryDocumentation } from "../Documentation/printButton";

const RoomPage = () => {
    const { id } = useParams();
    const [room, setRoom] = useState([]);
    const [inventory,setInventory] = useState([])
    const [worker, setWorker] = useState([])
    const [imageList,setImageList] = useState({})
    const imageListRef = ref(storage, "images/react-porfolio.png")


    // const PrintButton = () => {
    //   window.print();
    // }

    const getRoomById = async (id) => {
      try {
        const result = await api.get(`/api/Room/${id}`);
        const data = result.data;
        setRoom(data);
        console.log(data)
      }
      catch (error) {
        console.log(error)
      }
    }

   
  
    useEffect(() =>{

      getDownloadURL(imageListRef).then((url) => {
        setImageList(url)
        //console.log(imageList)
      })
      // listAll(imageListRef).then((response) => {
      //   response.items.forEach((item) =>{
      //     getDownloadURL(item).then((url) => {
      //       setImageList((prev) => [...prev, url])
      //     })
      //   })
      // })
       
      getRoomById(id);
    },[id])


    const boss = room.worker;
    const roomInventory = inventory.find(item => item.roomId == id);
    if (!roomInventory || !boss) {
          getRoomById(id);
        return <div>Loading...</div>;
      }

      return (
           <div className="room-details">

            <img style={{width:300 , height:100}} src={imageList} />

            <h1>ID SOBE:{id}</h1>
            <div>
              <h1>Name:{room.name}</h1>
              <h1>Floor:{room.floor}</h1>
              <h1>Width:{room.width}</h1>
              <h1>Length:{room.lenght}</h1>
              <h1>Height:{room.height}</h1>
              <h1>Boss:{room.boss}</h1>
            </div>
            <br />
            <h1>Inventar</h1>
            <div>
              <h1>Name: {room.inventory.name}</h1>
              <h1>Serial Number: {room.inventory.serialNumber}</h1>
              <h1>Mark: {room.inventory.mark}</h1>
              <h1>Model: {room.inventory.model}</h1>
              <h1>Quantity: {room.inventory.quantity}</h1>
              <h1>Price: {room.inventory.price}</h1>
            </div>
            <br />
            <h1>Worker</h1>
            <div>
              <h1>Name: {room.worker.name}</h1>
              <h1>Surname: {room.worker.surname}</h1>
              <h1>Gender: {room.worker.gender}</h1>
              <h1>Personalnumber: {room.worker.personalNumber}</h1>
              <h1>Qualification: {room.worker.qualification}</h1>
            </div>

            <button onClick={printInventoryDocumentation}>Print Document</button>
            {/* {imageList.map((url) => {
          return <img style={{width:300 , height:100}} src={url} />
        })} */}

</div>
        )
        

}


export default RoomPage;


