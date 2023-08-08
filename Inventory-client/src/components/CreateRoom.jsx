/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import api from '../api/api';

const CreateRoom = ({ refreshRooms }) => {
  const [Name, setRoomName] = useState('');
  const [Floor, setFloor] = useState('');
  const [Width, setWidth] = useState('');
  const [Length, setLength] = useState('');
  const [Height, setHeight] = useState('');
  const [Boss, setBoss] = useState('');
  const [inventoryName, setInventoryName] = useState('');
  const [workerQualification, setWorkersQualification] = useState('');
  const [workerGender, setWorkersGender] = useState('');
  const [workerPersonalNumber, setWorkersPersonalNumber] = useState('');
  const [inventorySerialNumber, setInventorySerialNumber] = useState('');
  const [inventoryModel, setInventoryModel] = useState('');
  const [inventoryMark, setInventoryMark] = useState('');
  const [inventoryQuantity, setInventoryQuantity] = useState('');
  const [inventoryPrice, setInventoryPrice] = useState('');
  const [roomId, setRoomId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newRoom = {
        id: roomId,
        Name: Name,
        Floor,
        boss: {
          name: Boss,
          qualification: workerQualification,
          gender: workerGender,
          personalNumber : workerPersonalNumber
       
        },
        inventory: {
          name: inventoryName,
          serialNumber: inventorySerialNumber,
          model: inventoryModel,
          mark: inventoryMark,
          quantity : inventoryQuantity,
          price: inventoryPrice
        },
        height: Height,
        length: Length,
        width: Width,
      };

      await api.post('/api/Room', newRoom);
      refreshRooms();
      setRoomName('');
      setFloor('');
      setHeight('');
      setWidth('');
      setLength('')
      setRoomId('');
      setBoss('');
      setInventoryName('');
      setWorkersQualification('');
      setWorkersGender('');
      setWorkersPersonalNumber('');
      setInventoryName('');
      setInventorySerialNumber('');
      setInventoryModel('');
      setInventoryMark('');
      setInventoryQuantity('');
      setInventoryPrice('');

    } catch (error) {
      console.log('Error creating room:', error);
    }
  };

  return (
    <div className="create-room-container">
    <h2>Create a New Room</h2>
    <form onSubmit={handleSubmit}>
      {/* Input fields for room details */}
      <input
        type="text"
        placeholder="Room Name"
        value={Name}
        onChange={(e) => setRoomName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Floor"
        value={Floor}
        onChange={(e) => setFloor(e.target.value)}
      />

    <input
        type="text"
        placeholder="Width"
        value={Width}
        onChange={(e) => setWidth(e.target.value)}
      />

<input
        type="text"
        placeholder="Length"
        value={Length}
        onChange={(e) => setLength(e.target.value)}
      />

<input
        type="text"
        placeholder="Height"
        value={Height}
        onChange={(e) => setHeight(e.target.value)}
      />
      
      <input
          type="text"
          placeholder="Room ID" 
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />

      

      {/* Input fields for boss details */}
      <input
        type="text"
        placeholder="Boss Name"
        value={Boss}
        onChange={(e) => setBoss(e.target.value)}
      />
      <input
        type="text"
        placeholder="Worker Qualification"
        value={workerQualification}
        onChange={(e) => setWorkersQualification(e.target.value)}
      />
      <input
        type="text"
        placeholder="Worker Gender"
        value={workerGender}
        onChange={(e) => setWorkersGender(e.target.value)}
      />
      <input
        type="text"
        placeholder="Worker Personal Number"
        value={workerPersonalNumber}
        onChange={(e) => setWorkersPersonalNumber(e.target.value)}
      />

      {/* Input fields for inventory details */}
      <input
        type="text"
        placeholder="Inventory Name"
        value={inventoryName}
        onChange={(e) => setInventoryName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Inventory Serial Number"
        value={inventorySerialNumber}
        onChange={(e) => setInventorySerialNumber(e.target.value)}
      />
      <input
        type="text"
        placeholder="Inventory Model"
        value={inventoryModel}
        onChange={(e) => setInventoryModel(e.target.value)}
      />
      <input
        type="text"
        placeholder="Inventory Mark"
        value={inventoryMark}
        onChange={(e) => setInventoryMark(e.target.value)}
      />
      <input
        type="text"
        placeholder="Inventory Quantity"
        value={inventoryQuantity}
        onChange={(e) => setInventoryQuantity(e.target.value)}
      />
      <input
        type="text"
        placeholder="Inventory Price"
        value={inventoryPrice}
        onChange={(e) => setInventoryPrice(e.target.value)}
      />

      <button type="submit">Create Room</button>
    </form>
  </div>
  );
};

export default CreateRoom;
