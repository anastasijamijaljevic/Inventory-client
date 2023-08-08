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
  const [room, setRoom] = useState([]);
  const [inventory, setInventory] = useState([])
  const [image, setImage] = useState([]);
  const [workers, setWorkers] = useState([])
  const [worker, setWorker] = useState([])
  const [showInventoryForm, setShowInventoryForm] = useState(false);
  const [workerId, setWorkerId] = useState({
    workerId: 'a4625e35-1846-46b9-b7bb-fc21b032573e'
  })
  const navigate = useNavigate();
  const [createdInventory, setCreatedInventory] = useState({
    Name: '',
    SerialNumber: 0,
    Mark: '',
    Model: '',
    Quantity: 0,
    Price: 0,
    ImageUrl: 'kelly-sikkema-tk9RQCq5eQo-unsplash.jpg',
    RoomId: `${id}`
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
      const response = await api.put(`/api/Room/${roomId}/worker`, workerId, {
        headers: {
          'Content-Type': 'application/json'
        },
      });
      console.log('Boss added successfully:', response.data);
      getRoomById(id); // Refresh the list of users after update
    } catch (error) {
      console.error('Error adding Boss:', error);
    }
  };

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
    // getDownloadURL(imageListRef).then((url) => {
    //   setImageList(url)
    //   //console.log(imageList)
    // })

    // listAll(imageListRef).then((response) => {
    //   response.items.forEach((item) =>{
    //     getDownloadURL(item).then((url) => {
    //       setImageList((prev) => [...prev, url])
    //     })
    //   })
    // }) 
    getRoomById(id);
    getAllWorkers();

  }, [id, createdInventory])


  // const boss = room.worker;
  // if (!boss) {
  //       getRoomById(id);
  //     return <div>Loading...</div>;
  //   }

  const handleInventoryFormSubmit = async (event) => {
    event.preventDefault();

    try {
      
      await createInventory();
      
      
      setCreatedInventory({
        Name: '',
        SerialNumber: 0,
        Mark: '',
        Model: '',
        Quantity: 0,
        Price: 0,
        ImageUrl: 'kelly-sikkema-tk9RQCq5eQo-unsplash.jpg',
        RoomId: `${id}`
      });
      
     
      setShowInventoryForm(false);
    } catch (error) {
      console.error('Error creating Inventory:', error);
    }
  };

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
        {/* {image.map((imageUrl, index) => (
              <div key={index}>
                <img  style={{width:300 , height:100}} src={imageUrl} alt={`Image ${index}`} />
                <h1>Name: {room.inventory[index].name}</h1>
                <h1>Image: {room.inventory[index].imageUrl}</h1>
                <h1>Serial Number: {room.inventory[index].serialNumber}</h1>
                <h1>Mark: {room.inventory[index].mark}</h1>
                <h1>Model: {room.inventory[index].model}</h1>
                <h1>Quantity: {room.inventory[index].quantity}</h1>
                <h1>Price: {room.inventory[index].price}</h1>

                <button onClick={() => deleteInventory(room.inventory[index].id)}>Delete Inventory</button>
              </div>                      
                    ))} */}


        {/*KADA SE BUDE RADIO CSS POSTO CE SE SLIKE OVDE UCITAVATI ONDA NEKA CELI DEO ZA INVENTAR BUDE UNUTAR OVE MAP FUNKCIJE
            ZBOG SLIKA, OSTALO MOZE DA BUDE VAN*/}
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

        {worker && (
          <div>
            <h1>Name: {worker.name}</h1>
            <h1>Surname: {worker.surname}</h1>
            <h1>Gender: {worker.gender}</h1>
            <h1>Personalnumber: {worker.personalNumber}</h1>
          </div>
        )}


        <h1>Available Workers:</h1>
        {workers.map((workerItem) => (
          <div key={workerItem.id}>
            <h1>Name: {workerItem.name}</h1>
            <h1>Surname: {workerItem.surname}</h1>
            <h1>Gender: {workerItem.gender}</h1>
            <h1>Personalnumber: {workerItem.personalNumber}</h1>
            <h1>Qualification: {workerItem.qualification}</h1>
          </div>
        ))}


        <button onClick={() => UpdateWorker(room.id)}>Add Boss</button>
        {/* <button onClick={() => setWorker(workers[0])}>Add Boss</button> */}

        <button onClick={printInventoryDocumentation}>Print Document</button>

      </div>

      


      <button onClick={() => setShowInventoryForm(true)}>Add Inventory</button>

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
      <label htmlFor="serialNumber">Serial Number:</label>
      <input
        type="number"
        id="serialNumber"
        value={createdInventory.SerialNumber}
        onChange={(e) =>
          setCreatedInventory({ ...createdInventory, SerialNumber: parseInt(e.target.value) })
        }
      />
      <label htmlFor="mark">Mark:</label>
      <input
        type="text"
        id="mark"
        value={createdInventory.Mark}
        onChange={(e) =>
          setCreatedInventory({ ...createdInventory, Mark: e.target.value })
        }
      />
      <label htmlFor="model">Model:</label>
      <input
        type="text"
        id="model"
        value={createdInventory.Model}
        onChange={(e) =>
          setCreatedInventory({ ...createdInventory, Model: e.target.value })
        }
      />
      <label htmlFor="quantity">Quantity</label>
      <input
        type="number"
        id="quantity"
        value={createdInventory.Quantity}
        onChange={(e) =>
          setCreatedInventory({ ...createdInventory, Quantity: parseInt(e.target.value) })
        }
      />
      <label htmlFor="price">Price:</label>
      <input
        type="number"
        id="price"
        value={createdInventory.Price}
        onChange={(e) =>
          setCreatedInventory({ ...createdInventory, Price: parseFloat(e.target.value) })
        }
      />
      <button type="submit">Add Inventory</button>
    </form>
  </div>
)}
<Footer/>
</>
  )


}


export default RoomPage;


