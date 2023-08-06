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
    const [image , setImage] = useState([]);


    const deleteInventory = async (id) => {
      try {
        await api.delete(`/api/Inventory/${id}`);
        console.log('User deleted successfully');
        getAllInventories(); // Refresh the list of users after deletion
        window.location.reload();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    };

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

    const getImage = async (imageName) => {
      const imageRef = ref(storage,`images/${imageName}`);
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
        console.log(data)
        // getImage(data.inventory.imageUrl)
        // .then(url => setImage(url))
        // .catch(error => {
        //   console.log(error)
        // })
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

   
  
    useEffect(() =>{


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
      getAllInventories();
      
    },[id])


    const boss = room.worker;
    //const roomInventory = inventory.find(item => item.roomId == id);
    //console.log(roomInventory)
    if (!boss) {
          getRoomById(id);
        return <div>Loading...</div>;
      }

      
      return (
           <div className="room-details">

            {/* {image && (
            <img style={{width:300 , height:100}} src={image} alt="Image not Found" />
            )} */}

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
            {/*KADA SE BUDE RADIO CSS POSTO CE SE SLIKE OVDE UCITAVATI ONDA NEKA CELI DEO ZA INVENTAR BUDE UNUTAR OVE MAP FUNKCIJE
            ZBOG SLIKA, OSTALO MOZE DA BUDE VAN*/}
            {image.map((imageUrl, index) => (
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
                    ))}
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

</div>
        )
        

}


export default RoomPage;


