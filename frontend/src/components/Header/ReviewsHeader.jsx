import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, InputBase, Box, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { Autocomplete } from '@react-google-maps/api';
import useStyles from './styles';
import { Link } from 'react-router-dom';

const ReviewsHeader = () => {
  const classes = useStyles();

  const handleLogout = () => {
    // Add logic to clear user data from local storage or perform any necessary cleanup
    localStorage.removeItem('user');
    // setIsLoggedIn(false);
    // Redirect to the home page or another relevant page after logout
    // history.push('/');
  };

  const renderButtons = () => {
      return (
        <>
        <Link to="/" style={{color: "white"}}>
          <Button color="inherit">Home</Button>
        </Link>
          <Button color="inherit">Distance</Button>
          {/* <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button> */}
        </>
      );

  };

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" className={classes.title}>
          Travel Advisor
        </Typography>
        <Box ml="auto">{renderButtons()}</Box>
      </Toolbar>
    </AppBar>
  );
};

export default ReviewsHeader;