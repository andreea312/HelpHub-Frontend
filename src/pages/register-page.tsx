import React, { useState, useEffect } from 'react';
import { Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { CSSProperties, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UsersContext } from '../auth/RegisterProvider';
import { RegisteredUser } from '../shared/Types';
import background from './fundal.png';

export const RegisterPage = () => {
    const { addUser } = useContext(UsersContext);
    const [email, setEmail] = useState('');
    const [parola, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [gender, setGender] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const navigate = useNavigate();
  
    const handleRegister = async () => {
      try {
        if (parola !== confirmPassword) {
          console.error('Passwords do not match');
          setPasswordsMatch(false);
          return;
        }
  
        const user: RegisteredUser = {
          username: username,
          email: email,
          parola: parola,
          fullName: fullName,
          gender: parseInt(gender),
          points: 0,
          nrDonations: 0,
        };
  
        console.log(user);
        await addUser?.(user);
        console.log('added user!!');
        navigate('/');
      } catch (error: any) {
        console.log('error: ' + error);
      }
    };
  
    const handleUsername = (event: any) => {
      setUsername(event.target.value);
    };
  
    const handleEmail = (event: any) => {
      setEmail(event.target.value);
    };
  
    const handlePassword = (event: any) => {
      setPassword(event.target.value);
      // Reset the error state when typing in the password field
      setPasswordsMatch(true);
    };
  
    const handleConfirmPassword = (event: any) => {
      setConfirmPassword(event.target.value);
      // Validate passwords match and set the error state
      setPasswordsMatch(parola === event.target.value);
    };
  
    const handleFullName = (event: any) => {
      setFullName(event.target.value);
    };
  
    const handleGender = (event: any) => {
      setGender(event.target.value);
    };
  
    return (
      <>
        <div style={wrapperStyle1}>
          <Container sx={wrapperStyle2}>
            <Typography variant={'h3'} sx={{ fontFamily: 'Pacifico, cursive' }}>
              HelpHub
            </Typography>
            <Typography variant={'h4'}>Register</Typography>
            <br />
            <TextField
              value={email}
              label="email"
              onChange={handleEmail}
            />
            <br />
            <TextField
              value={username}
              label="username"
              onChange={handleUsername}
            />
            <br />
            <TextField
              value={parola}
              label="password"
              onChange={handlePassword}
              type="password"
            />
            <br />

            <TextField
              value={confirmPassword}
              label="confirm password"
              onChange={handleConfirmPassword}
              type="password"
              error={!passwordsMatch}
              helperText={passwordsMatch ? '' : 'Passwords do not match'}
            />
            <br />
            <TextField
              value={fullName}
              label="full name"
              onChange={handleFullName}
            />
            <br />
            <FormControl margin="dense" variant="outlined" sx={{ width: '73%' }}>
              <InputLabel>gender</InputLabel>
              <Select label="Gender" value={gender} onChange={handleGender}>
                <MenuItem value="0">Male</MenuItem>
                <MenuItem value="1">Female</MenuItem>
                <MenuItem value="2">Other</MenuItem>
              </Select>
            </FormControl>
            <br />
            <Button
              sx={{
                background: '#9999ff',
                '&:hover': {
                  backgroundColor: '#ccccff',
                },
                color: 'black',
                textTransform: 'none',
                width: '30%',
                fontFamily: 'Pacifico, cursive',
              }}
              onClick={handleRegister}
            >
              Register
            </Button>
          </Container>
        </div>
      </>
    );
  };

const wrapperStyle1: CSSProperties = {
  margin: '0px',
  padding: '0px',
  backgroundImage: `url(${background})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
};

const wrapperStyle2: CSSProperties = {
  backgroundColor: 'transparent',
  backdropFilter: 'blur(5px)',
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  width: '50vh',
  border: '1px solid black',
  borderRadius: '15px',
  padding: '16px',
};

const wrapperStyleLeft: CSSProperties = {
  backgroundColor: 'transparent',
  height: '100vh',
  margin: '0px',
  width: '38.5%',
};
const wrapperStyleRight: CSSProperties = {
  backgroundColor: 'transparent',
  height: '100vh',
  margin: '0px',
  width: '38.5%',
};
