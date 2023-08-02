import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import api from '../../api/api'

const RoomPage = () => {
    const { id } = useParams();
    const [worker, setWorker] = useState([]);
    const [room, setRoom] = useState([]);
    const [inventory,setInventory] = useState([])

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

    const getWorkerById = async (id) => {
      try {
        const result = await api.get(`/api/Worker/${id}`);
        const data = result.data;
        setWorker(data);
        console.log(data)
      }
      catch (error) {
        console.log(error)
      }
    }
    
    useEffect(() =>{
      getRoomById(id);
      getWorkerById(room.workerId)
      getAllInventories();
    },[id,room.workerId])

    const roomInventory = inventory.find(item => item.roomId == id);
    if (!roomInventory) {
        return <div>Loading...</div>;
      }

      return (
           <div className="room-details">
            <h1>ID SOBE:{room.id}</h1>
            <div>
              <h1>Name:{room.name}</h1>
              <h1>Floor:{room.floor}</h1>
              <h1>Width:{room.width}</h1>
              <h1>Length:{room.length}</h1>
              <h1>Height:{room.height}</h1>
              <h1>Boss:{room.boss}</h1>
            </div>
            <br />
            <h1>Inventar</h1>
            <div>
              <h1>Name: {roomInventory.name}</h1>
              <h1>Serial Number: {roomInventory.serialNumber}</h1>
              <h1>Mark: {roomInventory.mark}</h1>
              <h1>Model: {roomInventory.model}</h1>
              <h1>Quantity: {roomInventory.quantity}</h1>
              <h1>Price: {roomInventory.price}</h1>
            </div>
            <br />
            <h1>Worker</h1>
            <div>
              <h1>Name: {worker.name}</h1>
              <h1>Surname: {worker.surname}</h1>
              <h1>Gender: {worker.gender}</h1>
              <h1>Personalnumber: {worker.personalnumber}</h1>
              <h1>Qualification: {worker.qualification}</h1>
            </div>

{/*             
           <div>
           <strong>Serijski broj:</strong> {room.serialNumber}
           </div>
           <div>
           <strong>Cena:</strong> {worker.name} 
           </div> */}
</div>
        )
        

}


export default RoomPage;