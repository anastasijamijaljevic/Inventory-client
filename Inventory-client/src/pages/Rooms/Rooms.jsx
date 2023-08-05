import { useState } from 'react'
import { useEffect } from 'react'
import api from '../../api/api'
import './Rooms.css'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import CreateRoom from '../../components/CreateRoom'



const Rooms = () => {
  const { id } = useParams();
  const [rooms, setRooms] = useState([]);

  const refreshRooms = async () => {
    try {
      const result = await api.get('/api/Room');
      const data = result.data;
      setRooms(data);
      console.log(data);
    } catch (error) {
      console.log('Error fetching rooms:', error);
    }
  };
 
  useEffect(() => {

    refreshRooms();
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
    </div>
    <CreateRoom refreshRooms={refreshRooms} />
  

</>
  )

}

export default Rooms;