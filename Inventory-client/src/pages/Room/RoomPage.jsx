import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import api from '../../api/api'

const RoomPage = () => {
    const { id } = useParams();
    const [inventory, setInventory] = useState([]);

    useEffect(() => {
    const getAllInventories = async () => {
        try {
          const result = await api.get("../../api/Inventory");
          const data = result.data;
          setInventory(data);
          console.log(data)
        }
        catch (error) {
          console.log(error)
        }
      }
      getAllInventories();
    },[])

    const roomInventory = inventory.find(item => item.roomId === id);
    if (!roomInventory) {
        return <div>Loading...</div>;
      }

      return (
           <div className="room-details">
            <h1>{roomInventory.name}</h1>
           
         
           <div>
           <strong>Serijski broj:</strong> {roomInventory.serialNumber}
           </div>
           <div>
           <strong>Cena:</strong> {roomInventory.price}
           </div>
</div>
        )
        

}


export default RoomPage;