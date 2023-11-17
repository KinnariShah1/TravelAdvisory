// import React, {useState} from 'react'
// import { Autocomplete } from '@react-google-maps/api';
// import { AppBar, Toolbar, Typography,InputBase, Box } from '@material-ui/core';
// import { CallMissedSharp } from '@material-ui/icons';
// import SearchIcon from '@material-ui/icons/Search'

// import useStyles from './styles';

// const Header = ({ setCoordinates }) => {
//     const classes = useStyles();
//     const [autocomplete, setAutocomplete] = useState(null);

//     const onLoad = (autoC) => setAutocomplete(autoC);
    
//     const onPlaceChanged = () => {
//         const lat = autocomplete.getPlace().geometry.location.lat();
//         const lng = autocomplete.getPlace().geometry.location.lng();

//         setCoordinates({lat, lng});
//     }

//     return (
//         <AppBar position="static">
//             <Toolbar className={classes.toolbar}>
//                 <Typography variant="h5" className={classes.title}>
//                     Travel Advisor
//                 </Typography>
//                 <Box display="flex">
//                     <Typography variant="h6" className={classes.title}>
//                         Explore new places
//                     </Typography>
//                     <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
//                         <div className={classes.search}>
//                             <div className={classes.searchIcon}>
//                                 <SearchIcon/>
//                             </div>
//                             <InputBase placeholder="Search..." classes={{ root: classes.inputRoot, input: classes.inputInput }}/>
//                         </div>
//                     </Autocomplete>
//                 </Box>
//             </Toolbar>
//         </AppBar>
//     );
// }

// export default Header;



// Header.jsx
// import React, { useState } from 'react';
// import { AppBar, Toolbar, Typography, InputBase, Box, Button } from '@material-ui/core';
// import SearchIcon from '@material-ui/icons/Search';
// import { Autocomplete } from '@react-google-maps/api';
// import useStyles from './styles';

// const Header = ({ setCoordinates, openLogin, openRegister }) => {
//   const classes = useStyles();
//   const [autocomplete, setAutocomplete] = useState(null);

//   const onLoad = (autoC) => setAutocomplete(autoC);

//   const onPlaceChanged = () => {
//     const lat = autocomplete.getPlace().geometry.location.lat();
//     const lng = autocomplete.getPlace().geometry.location.lng();
//     setCoordinates({ lat, lng });
//   };

//   return (
//     <AppBar position="static">
//       <Toolbar className={classes.toolbar}>
//         <Typography variant="h5" className={classes.title}>
//           Travel Advisor
//         </Typography>
//         <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
//           <div className={classes.search}>
//             <div className={classes.searchIcon}>
//               <SearchIcon />
//             </div>
//             <InputBase placeholder="Search..." classes={{ root: classes.inputRoot, input: classes.inputInput }} />
//           </div>
//         </Autocomplete>
//         <Box ml="auto">
//           <Button color="inherit" onClick={openLogin}>
//             Login
//           </Button>
//           <Button color="inherit" onClick={openRegister}>
//             Register
//           </Button>
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Header;



// Header.jsx
import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, InputBase, Box, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { Autocomplete } from '@react-google-maps/api';
import useStyles from './styles';
import { Link } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';

const Header = ({ setCoordinates, openLogin, openRegister, isLoggedIn, setIsLoggedIn }) => {
  const classes = useStyles();
  const [autocomplete, setAutocomplete] = useState(null);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const history = useHistory();

  useEffect(() => {
    // Check if the user is already logged in (you might use a more secure method in a real application)
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();
    setCoordinates({ lat, lng });
  };

  const handleLogout = () => {
    // Add logic to clear user data from local storage or perform any necessary cleanup
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    // Redirect to the home page or another relevant page after logout
    // history.push('/');
  };

  const renderButtons = () => {
    if (isLoggedIn) {
      return (
        <>
        <Link to="/reviews" style={{color: "white"}}>
          <Button color="inherit">Reviews</Button>
        </Link>
          <Button color="inherit">Distance</Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Button color="inherit" onClick={openLogin}>
            Login
          </Button>
          <Button color="inherit" onClick={openRegister}>
            Register
          </Button>
        </>
      );
    }
  };

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" className={classes.title}>
          Travel Advisor
        </Typography>
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase placeholder="Search..." classes={{ root: classes.inputRoot, input: classes.inputInput }} />
          </div>
        </Autocomplete>
        <Box ml="auto">{renderButtons()}</Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

