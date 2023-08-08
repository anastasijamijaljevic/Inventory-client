/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import api from '../../api/api'
import { storage } from '../../firebase'
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'
import { printInventoryDocumentation } from "../Documentation/printButton";
import { useNavigate } from 'react-router-dom';
import Navbar from "../../components/Navbar/Navbar";
import Footer from '../../components/Footer/Footer'

const RoomPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState([]);
  const [inventory, setInventory] = useState([])
  const [image, setImage] = useState([]);
  const [workers, setWorkers] = useState([])
  const [worker, setWorker] = useState([])
  const [showInventoryForm, setShowInventoryForm] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [imageUpload,setImageUpload] = useState(null)
  const [createdInventory, setCreatedInventory] = useState({
    Name: '',
    SerialNumber: 0,
    Mark: '',
    Model: '',
    Quantity: 0,
    Price: 0,
    ImageUrl: '',
    RoomId: `${id}`
  })



  // WORKER/BOSS: 
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
      getRoomById(id);
    } catch (error) {
      console.error('Error adding Boss:', error);
    }
  };



  //INVENTORY:
  const createInventory = async () => {
    try {
      const response = await api.post('/api/Inventory', createdInventory);
      console.log('Inventory created successfully:', response.data);
      getRoomById(id);
    } catch (error) {
      console.error('Error creating Inventory:', error);
    }
  };

  const deleteInventory = async (inventory_id) => {
    try {
      await api.delete(`/api/Inventory/${inventory_id}`);
      console.log('Inventory deleted successfully');
      getRoomById(id);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };



  //IMAGES:
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


  const getImage = async (imageName) => {
    const imageRef = ref(storage, `images/${imageName}`);
    try {
      const url = await getDownloadURL(imageRef);
      return url;
    } catch (error) {
      console.error('Error getting image URL from Firebase:', error);
      return null;
    }
  };


  const handleInventoryFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const uploadedImageUrl = await uploadImage();
      console.log(uploadedImageUrl)

     
      await createInventory();
      
      
      setCreatedInventory({
        Name: '',
        SerialNumber: 0,
        Mark: '',
        Model: '',
        Quantity: 0,
        Price: 0,
        ImageUrl: '',
        RoomId: `${id}`
      });

      console.log(createdInventory)
     
      setShowInventoryForm(false);
    } catch (error) {
      console.error('Error creating Inventory:', error);
    }
  };



  //ROOM
  const getRoomById = async (id) => {
    try {
      const result = await api.get(`/api/Room/${id}`);
      const data = result.data;
      setRoom(data);
      setInventory(data.inventory)
      setWorker(data.worker)
      const imageUrls = await Promise.all(data.inventory.map(async item => {
        try {
          const imageUrl = await getImage(item.imageUrl);
          return imageUrl;
        } catch (error) {
          console.log(error);
          return null;
        }
      }));

      setImage(imageUrls.filter(url => url !== null));
    }
    catch (error) {
      console.log(error)
    }
  }

  const deleteRoom = async (id) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this room?');
      if (confirmDelete) {
        await api.delete(`/api/Room/${id}`);
        console.log('Room deleted successfully');
        alert('Room Deleted Successfully');
        navigate('/rooms');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };




  useEffect(() => {
    getRoomById(id);
    getAllWorkers();

  }, [id, createdInventory])


  // const boss = room.worker;
  // if (!boss) {
  //       getRoomById(id);
  //     return <div>Loading...</div>;
  //   }

  

  return (
    <>
      <Navbar />
      <div className="room-details">
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
        <h1>Inventory:</h1>

        {inventory.map((item, index) => (
          <div key={index}>
            <img style={{ width: 300, height: 100 }} src={image[index]} alt={`Image ${index}`} />
            <h1>Name: {item.name}</h1>
            <h1>Image: {item.imageUrl}</h1>
            <h1>Serial Number: {item.serialNumber}</h1>
            <h1>Mark: {item.mark}</h1>
            <h1>Model: {item.model}</h1>
            <h1>Quantity: {item.quantity}</h1>
            <h1>Price: {item.price}</h1>

            <button onClick={() => deleteInventory(room.inventory[index].id)}>Delete Inventory</button>
          </div>
        ))}

       <button onClick={() => setShowInventoryForm(true)}>Add Inventory</button>
        <button onClick={() => deleteRoom(room.id)}>Delete Room</button>
        <br />
        <h1>Boss:</h1>

        {worker ? (
          <div>
            <h1>Name: {worker.name}</h1>
            <h1>Surname: {worker.surname}</h1>
            <h1>Gender: {worker.gender}</h1>
            <h1>Personalnumber: {worker.personalNumber}</h1>
          </div>
        ) : (
        <div>
          <label htmlFor="selectedWorker">Select Boss:</label>
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
          <button onClick={() => UpdateWorker(room.id)}>Add Boss</button>
        </div>
        )}

        <button onClick={printInventoryDocumentation}>Print Document</button>

      </div>
        

      



      {showInventoryForm && (
      <div>
        <form onSubmit={handleInventoryFormSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={createdInventory.Name}
            onChange={(e) =>
              setCreatedInventory({ ...createdInventory, Name: e.target.value })
            }
          />
          <br />
          <label htmlFor="serialNumber">Serial Number:</label>
          <input
            type="number"
            id="serialNumber"
            value={createdInventory.SerialNumber}
            onChange={(e) =>
              setCreatedInventory({ ...createdInventory, SerialNumber: parseInt(e.target.value) })
            }
          />
          <br />
          <label htmlFor="mark">Mark:</label>
          <input
            type="text"
            id="mark"
            value={createdInventory.Mark}
            onChange={(e) =>
              setCreatedInventory({ ...createdInventory, Mark: e.target.value })
            }
          />
          <br />
          <label htmlFor="model">Model:</label>
          <input
            type="text"
            id="model"
            value={createdInventory.Model}
            onChange={(e) =>
              setCreatedInventory({ ...createdInventory, Model: e.target.value })
            }
          />
          <br />
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            value={createdInventory.Quantity}
            onChange={(e) =>
              setCreatedInventory({ ...createdInventory, Quantity: parseInt(e.target.value) })
            }
          />
          <br />
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            value={createdInventory.Price}
            onChange={(e) =>
              setCreatedInventory({ ...createdInventory, Price: parseFloat(e.target.value) })
            }
          />
          <label htmlFor="Image">Image</label>
          <input 
            type="file" 
            onChange={(e) => {
              setImageUpload(e.target.files[0]);
              setCreatedInventory({ ...createdInventory, ImageUrl: e.target.files[0].name})
              }} />
          <button type="submit" onClick={handleInventoryFormSubmit}>Add Inventory</button>
        </form>
      </div>
      )}
      <Footer/>
    </>
  )
}


export default RoomPage;