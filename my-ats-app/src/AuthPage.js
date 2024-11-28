import React, { useState } from 'react';
import { Container, Paper, Tab, Tabs, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import ipec from './ipec_logo.png';

const AuthPage = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleAuthSuccess = () => {
    navigate('/student');
  };

  return (
    <Container maxWidth="sm">
      <img src={ipec} alt="IPEC Logo" style={{ height: 60, width: 60 }} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          //backgroundColor: '#e0f7fa',
        }}
      >
        <Paper elevation={3} sx={{ width: '100%', padding: 2 }}>
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            {/*<img src={ipec} alt="IPEC Logo" style={{ height: 60, width: 60 }} /> */}
          </Box>
          <Tabs
            value={value}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Sign In" />
            <Tab label="Create Account" />
          </Tabs>
          <Box p={3}>
            {value === 0 && <Login onSuccess={handleAuthSuccess} />}
            {value === 1 && <SignUp onSuccess={handleAuthSuccess} />}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default AuthPage;
