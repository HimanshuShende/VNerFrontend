import React, { Component } from "react";
import "./Home.css";


import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

import axios from "axios";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";

const baseURL = "https://vnerapi.azurewebsites.net/api";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export class Home extends Component {
  render() {
    return (
        <div>
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              V-NER
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>

      <br></br>
      <br></br>

      <Box
      sx={{
        display: 'grid',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 1000,
          height: 128,
        },
      }}
    >
      <Paper elevation={3} style={{ backgroundColor: '#1FAA59'}}>
      <Typography
      style={{ fontSize: '20px' }}
      variant="body2"
      color="textPrimary"
      component="span"
    >
      CRACK ANY EXAM WITH INDIA'S FIRST GAMING PLATFORM
    </Typography>
      </Paper>
    </Box>

    <br></br>
      <br></br>
      
    <Box sx={{ flexGrow: 1 }}>
      <Grid container justifyContent="center" spacing={12}>
        <Grid item xs={6} md={4}>
        <Paper
        sx={{
          height: 140,
          width: 100,
          backgroundColor: '#E5D68A'
        }}
      >
      <Typography
      style={{ fontSize: '20px' }}
      variant="body2"
      color="textPrimary"
      component="span"
    >
      CAT
    </Typography>
      </Paper>
        </Grid>
        <Grid item xs={6} md={4}>
        <Paper
        sx={{
          height: 140,
          width: 100,
          backgroundColor: '#E5D68A'
        }}
        >
        <Typography
        style={{ fontSize: '20px' }}
        variant="body2"
        color="textPrimary"
        component="span"
      >
        IIT
      </Typography>
        </Paper>
        </Grid>
        <Grid item xs={6} md={4}>
        <Paper
        sx={{
          height: 140,
          width: 100,
          backgroundColor: '#E5D68A'
        }}
        >
        <Typography
        style={{ fontSize: '20px' }}
        variant="body2"
        color="textPrimary"
        component="span"
      >
        GATE
      </Typography>
        </Paper>
        </Grid>
        <Grid item xs={6} md={4}>
        <Paper
        sx={{
          height: 140,
          width: 100,
          backgroundColor: '#E5D68A'
        }}
        >
        <Typography
        style={{ fontSize: '20px' }}
        variant="body2"
        color="textPrimary"
        component="span"
      >
        GRE
      </Typography>
        </Paper>
        </Grid>
        <Grid item xs={6} md={4}>
        <Paper
        sx={{
          height: 140,
          width: 100,
          backgroundColor: '#E5D68A'
        }}
        >
        <Typography
        style={{ fontSize: '20px' }}
        variant="body2"
        color="textPrimary"
        component="span"
      >
        NEET
      </Typography>
        </Paper>
        </Grid>
        <Grid item xs={6} md={4}>
        <Paper
        sx={{
          height: 140,
          width: 100,
          backgroundColor: '#E5D68A'
        }}
        >
        <Typography
        style={{ fontSize: '20px' }}
        variant="body2"
        color="textPrimary"
        component="span"
      >
        QUIZ
      </Typography>
        </Paper>
        </Grid>
      </Grid>
    </Box>

    <br></br>
    <br></br>

    <Box
      sx={{
        display: 'grid',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 1000,
          height: 128,
        },
      }}
    >
      <Paper elevation={3} style={{ backgroundColor: '#1FAA59', padding: '50px'}}>
      <Typography
      style={{ fontSize: '20px' }}
      variant="body2"
      color="textPrimary"
      component="span"
    >
      Games which help you
      <br></br>
      <br></br>

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
  <Grid xs={6}>
    Earn
  </Grid>
  <Grid xs={6}>
    Practice best mock papers
  </Grid>
  <Grid xs={6}>
    Get solutions of mock papers
  </Grid>
  <Grid xs={6}>
    Get papers from best educators
  </Grid>
</Grid>

    </Typography>
      </Paper>
    </Box>
    </div>
    )
  }
}

export default Home