import "./App_.css";
import DistanceHeader from "./components/Header/DistanceHeader";
import { React, useState, useRef } from "react";
import {
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
  useJsApiLoader,

} from "@react-google-maps/api";
import "./index.css";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  Text,
} from "@chakra-ui/react";
import { FaLocationArrow, FaTimes } from "react-icons/fa";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import NotFoundPage from "./components/Error/404";
// import  InternalServerErrorPage from "./components/Error/500";
// import ServiceUnavailablePage from "./components/Error/503";
// import ForbiddenPage from "./components/Error/403";


const center = { lat: 48.854, lng: 2.29 };
function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"]
  })


  const [map, setMap] = useState( (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');

   /*@type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /* @type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef();




  if (!isLoaded) return  <div>Some error </div>;

//   async function calculateRoute() {
//     if (
//       originRef.current.value === " " ||
//       destinationRef.current.value === ""
//     ) {
//       return;
//     }
//     const directionsService = new DirectionsService();
//     const results = await directionsService.route({
//       origin: originRef.current.value,
//       destination: destinationRef.current.value,
//       travelMode: 'DRIVING',
//     });
//     setDirectionsResponse(results);
//     setDistance(results.routes[0].legs[0].distance.text);
//     setDuration(results.routes[0].legs[0].duration.text);
//   }


async function calculateRoute() {
   if (
     originRef.current.value.trim() === "" ||
     destinationRef.current.value.trim() === ""
   ) {
     return;
   }
 
   const directionsService = new window.google.maps.DirectionsService();
   const request = {
     origin: originRef.current.value,
     destination: destinationRef.current.value,
     travelMode:  window.google.maps.TravelMode.DRIVING,
   };
 
   directionsService.route(request, (result, status) => {
     if (status === window.google.maps.DirectionsStatus.OK) {
       setDirectionsResponse(result);
       setDistance(result.routes[0].legs[0].distance.text);
       setDuration(result.routes[0].legs[0].duration.text);
     } else {
       console.error(`Error fetching directions: ${status}`);
     }
   });
 }


 
 function clearRoute() {
  originRef.current.value = "";
  destinationRef.current.value = "";
  setDirectionsResponse(null);
  setDistance("");
  setDuration("");
}

  return (
    <Flex
      position="relative"
      flexDirection="column"
      alignItems="center"
      h="100vh"
      w="100vw"
      data-testid="Flex"
    >
      <Box position="absolute" left={0} top={0} h="100%" w="100%">
      <DistanceHeader />
        <GoogleMap
          center={center}
          zoom={12}
          mapContainerClassName="map-container"
          options={{
            zoomControl: true,
          }}
          onLoad={(map) => setMap(map)}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </Box>
      <Box
        p={4}
        borderRadius="lg"
        m={4}
        bgColor="white"
        shadow="base"
        zIndex="1"
      >
        <HStack spacing={2} justifyContent="space-between">
          <Box flexGrow={1}>
            <Autocomplete>
              <Input type="text" placeholder="Origin " ref={originRef} />
            </Autocomplete>
          </Box>
          <Box flexGrow={1}>
            <Autocomplete>
              <Input
                type="text"
                placeholder="Destination"
                ref={destinationRef}
              />
            </Autocomplete>
          </Box>
          {/* <ButtonGroup>
            <Button colorScheme="purple" type="submit" onClick={calculateRoute}>
              Calculate Route
            </Button>   
            <IconButton aria-label="center back" icon={<FaTimes />} onClick={clearRoute} />
          </ButtonGroup>
        </HStack>
        <HStack spacing={4} mt={4} justifyContent="space-between">
          <Text>Distance : {distance} </Text>
          <Text>Duration : {duration} </Text>
          <IconButton
            aria-label="center back"
            icon={<FaLocationArrow />}
            isRoundonClick={() => {
              map.panTo(center);
              map.setZoom(15);
            }}
          />
        </HStack> */}
        <ButtonGroup>
          <Button colorScheme="purple" type="submit" onClick={calculateRoute}   style={{
    backgroundColor: '#3f51b5',
    height: '25px',
    borderRadius: '8px', // Adjust the value as needed
    cursor: 'pointer',
    color: 'white', // You may want to set a text color for better visibility
  }}>
            Calculate Route
          </Button>   
          <IconButton
            aria-label="center back"
            icon={<FaTimes />}
            onClick={clearRoute}
          />
        </ButtonGroup>
        </HStack>
        <HStack spacing={4} mt={4} justifyContent="space-between">
          <Text>Distance: {distance}</Text>
          <Text>Duration: {duration}</Text>
          <IconButton
            aria-label="center back"
            icon={<FaLocationArrow />}
            isRound
            onClick={() => {
              map.panTo(center);
              map.setZoom(15);
            }}
          />
        </HStack>

      </Box>
    </Flex>
  );
}

export default App;
