import React, { useState, useEffect } from "react";
import { CssBaseline, Grid } from "@material-ui/core";

import { getPlacesData, getWeatherData } from "./api";
import Header from "./components/Header/Header"
import List from "./components/List/List"
import Map from "./components/Map/Map"
import Login from './components/Login';
import Register from './components/Register';

const App1 = () => {
    const [places, setPlaces] = useState([]);
    const [weatherData, setWeatherData] = useState([])
    const [filteredPlaces, setFilteredPlaces] = useState([])
    
    const [childClicked, setChildClicked] = useState(null);

    const [coordinates, setCoordinates] = useState({});
    const [bounds,setBounds]=useState({});

    const [isLoading,setIsLoading] = useState(false);
    const [type, setType] = useState('restaurants')
    const [rating, setRating] = useState('');

    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
  
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    const openLogin = () => {
      setShowLogin(true);
      setShowRegister(false);
    };
  
    const openRegister = () => {
      setShowRegister(true);
      setShowLogin(false);
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: {latitude,longitude} }) => {
            setCoordinates({ lat:latitude, lng:longitude });
        })
    },[]);

    useEffect(() => {
        const filteredPlaces = places.filter((place) => place.rating > rating);

        setFilteredPlaces(filteredPlaces);
    }, [rating])
    

    useEffect(() => {
        if(bounds.sw && bounds.ne){
            setIsLoading(true);

            // getWeatherData(coordinates.lat, coordinates.lng)
            //     .then((data) => setWeatherData(data))

            getPlacesData(type, bounds.sw, bounds.ne)
                .then((data) => {
                    // console.log(data);
                    setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
                    setFilteredPlaces([])
                    setIsLoading(false);
                })
        }
    }, [type, bounds]);

    return (
        <>
            <CssBaseline/>
            <Header setCoordinates={setCoordinates} openLogin={openLogin} openRegister={openRegister} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <Grid container spacing={3} style={{ width:"100%" }}>
                <Grid item xs={12} md={4}>
                    <List 
                        places={filteredPlaces.length ? filteredPlaces : places}
                        childClicked={childClicked}
                        isLoading={isLoading}
                        type={type}
                        setType={setType}
                        rating={rating}
                        setRating={setRating}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        places={filteredPlaces.length ? filteredPlaces : places}
                        setChildClicked={setChildClicked}
                        weatherData={weatherData}
                    />
                </Grid>
            </Grid>
            {showLogin && <Login setShowLogin={setShowLogin} setIsLoggedIn={setIsLoggedIn} />}
            {showRegister && <Register setShowRegister={setShowRegister} setIsLoggedIn={setIsLoggedIn} />}
        </>
    );
}

export default App1;