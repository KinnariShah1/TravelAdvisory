import React, { useEffect, useState } from 'react';
import { Star } from "@material-ui/icons";
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import axios from "axios";
import "./app.css";
import {format} from "timeago.js";
import ReviewsHeader from "./components/Header/ReviewsHeader";
import { CssBaseline, Grid } from "@material-ui/core";

const containerStyle = {
  width: '100%',
  height: '100vh',
};

const center = {
  lat: 19.0760,
  lng: 72.8777,
};

const App = () => {
  const myStorage = window.localStorage;
  const [currentUser, setCurrentUser] = useState(myStorage.getItem("user"));
  const [pins, setPins] = useState([]);
  const [selectedPin, setSelectedPin] = useState(null);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null)
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [rating, setRating] = useState(0);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const getPins = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get("/pins",{
          headers: {
            Authorization: `${token}`,
          },
        });
        console.log('API Response:', res.data);
        setPins(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPins();
  }, []);

  const handleDelete = async (pinId) => {
    const token = localStorage.getItem('token');
    // Implement logic to handle deletion
    const confirmDelete = window.confirm("Are you sure you want to delete this pin?");
    
    if (confirmDelete) {
      try {
        // Make an API request to delete the pin
        console.log("deleting pin")
        await axios.delete(`/pins/${pinId}`,{
          headers: {
            Authorization: `${token}`,
          },
        });
  
        // Update the state to remove the deleted pin
        setPins((prevPins) => prevPins.filter((pin) => pin._id !== pinId));
  
        // Reset the selected pin
        setSelectedPin(null);
      } catch (error) {
        console.error("Error deleting pin:", error);
        // Implement error handling or user feedback as needed
      }
    }
  };  
  
  const handleAddClick = (event) => {
    // Get the coordinates from the event object
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    setNewPlace({
      lat: lat,
      long: lng
    })

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username:currentUser,
      title,
      desc,
      rating,
      lat: newPlace.lat,
      long: newPlace.long,
    }

    try {
      const token = localStorage.getItem('token');
      console.log(token);
      const res = await axios.post("/pins", newPin,{
        headers: {
          Authorization: `${token}`, // Include the token in the headers
        },
      })
      setPins([...pins, res.data]);
      setNewPlace(null);
    } catch (error) {
      console.log(error);
    }
  }

  const handleLogout = () => {
    myStorage.removeItem("user");
    setCurrentUser(null);
  }

  return (
    <>
    <CssBaseline/>
    <ReviewsHeader />
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onDblClick = {handleAddClick}
        className='google-map'
      >
      {/* console.log(currentUser); */}
        {pins.map((pin) => (
          <Marker
            key={pin._id}
            position={{ lat: pin.lat, lng: pin.long }}
            title={pin.title}
            onClick={() => setSelectedPin(pin)}
            // onClick={() => handleMarkerClick(pin._id)}
            icon={{
              url: currentUser === pin.username ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTboz7NxDawVFV0CIO0wtT7RqClYLGBfZTwZg&usqp=CAU" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGS38s9KQC8RPmaYFMP6NxlhyoNIeviTBvSQ&usqp=CAU",
              scaledSize: new window.google.maps.Size(40, 40), // Adjust the size as needed
            }}
            className="marker"
          >

          </Marker>
        ))}
        {selectedPin && (
          <InfoWindow
            position={{ lat: selectedPin.lat, lng: selectedPin.long }}
            onCloseClick={() => setSelectedPin(null)}
            className="info"
          >
            <div className="card">
              <label>Place:</label>
              <h4 className="place">{selectedPin.title}</h4>
              <label>Review:</label>
              <p className="desc">{selectedPin.desc}</p>
              <label>Rating:</label>
              <span className="stars">{'\u2605'.repeat(selectedPin.rating)}</span>
              <label>Information:</label>
              <span className="username">Created by <b>{selectedPin.username}</b></span>
              <span className="date">{format(selectedPin.createdAt)}</span>
              {currentUser === selectedPin.username && (
        <button onClick={() => handleDelete(selectedPin._id)} className="deleteButton">Delete</button>
      )}
            </div>
          </InfoWindow>
        )}

        {newPlace && (
          <InfoWindow
              position={{ lat: newPlace.lat, lng: newPlace.long }}
              onCloseClick={() => setNewPlace(null)}
            ><div>
              <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input 
                  placeholder='Enter a title' 
                  onChange={(e) => setTitle(e.target.value)}
                  className='title' 
                />
                <label>Review</label>
                <textarea placeholder='Say us something about this place' onChange={(e) => setDesc(e.target.value)} className='review'/>
                <label>Rating</label>
                <select onChange={(e) => setRating(e.target.value)} className="star">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button className="submitButton" type="submit">Add Pin</button>
              </form>
            </div></InfoWindow>
        )}
      </GoogleMap>
      </>
  );
  
};

export default App;
