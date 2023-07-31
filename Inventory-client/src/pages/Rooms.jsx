import { useState } from 'react'
import { useEffect } from 'react'
import api from '../api/api'
import './Rooms.css'


const Rooms = () => {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        
        const getAllRooms = async () => {
          try {
            const result = await api.get('/api/Room');
            const data = result.data;
            setRooms(data); 
            console.log(data); 
          } catch (error) {
            console.log('Error fetching rooms:', error);
          }
        };
    
        getAllRooms(); 
      }, []);

      return (
        <div className="room-list-container">
      <h1>Rooms</h1>
      <ul className="room-list">
        {rooms.map((room) => (
          <li key={room.id} className="room-item">
            <div>
              <strong>Name:</strong> {room.name}
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
        ))}
      </ul>
    </div>
    
      )

}

export default Rooms;