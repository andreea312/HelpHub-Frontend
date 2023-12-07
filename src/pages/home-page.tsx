import { Button, Container, TextField, Typography } from '@mui/material';
import { CSSProperties, useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthProvider';
import background from "./fundal.png";
import 'google-fonts'

export const HomePage=()=>{
    const { login, logout, user, isAuthenticated } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    useEffect(()=> {
        if(user.id){
            navigate('/causes');   
        }
    }, [user.id]);

    const handleLogin= () => {
        console.log('login!');
        login?.(email, password); 
    }
    const handleRegisterNav= () => {
        navigate('/register');   
    }
    const handleEmail = (event: any) => {
        setEmail(event.target.value);
    }
    const handlePassword = (event: any) => {
        setPassword(event.target.value);
    }
    return(
        <>
        <div style={wrapperStyle1}>
            <Container sx={wrapperStyleLeft}>
                
                <Typography variant={'h2'} sx={{ marginTop: '390px', color: '#551daa'}}>we care.</Typography>
                
                <Typography variant={'h2'} sx={{ marginTop: '30px', color: '#551daa' }}>we support.</Typography>
                
                <Typography variant={'h2'} sx={{ marginTop: '30px', color: '#551daa' }}>we change lives.</Typography>
            
            </Container>
            <Container sx={wrapperStyle2}>
                <Typography variant={'h3'} sx={{ fontFamily: 'Pacifico, cursive' }}>HelpHub</Typography>
                <Typography variant={'h4'}>Login</Typography>
                <br></br>
                <br></br>
                <br></br>
                <TextField
                value={email}
                label='email'
                onChange={handleEmail}
   
                />
                <br></br>
                <TextField
                    value={password}
                    label='password'
                    onChange={handlePassword}
                    type='password' 
                />
                <br></br>
                <Button sx={{ background: '#9999ff','&:hover': {
                        backgroundColor: '#ccccff',
                    }, color: 'black',  textTransform: 'none', width: '30%', fontFamily: 'Pacifico, cursive'}} onClick={handleLogin}>Log in</Button>
                <br></br>
                <Button sx={{ background: '#9999ff','&:hover': {
                        backgroundColor: '#ccccff',
                    }, color: 'black', textTransform: 'none', width: '30%', fontFamily: 'Pacifico, cursive'}} onClick={handleRegisterNav}>Register</Button>
            </Container>
            <Container sx={wrapperStyleRight}>
                
            </Container>
        </div>
        </>
        
    )
}


const wrapperStyle1: CSSProperties = {
    margin: '0px',
    padding: '0px',
    backgroundImage: `url(${background})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    display: 'flex',
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
    margin: '0px'
};

const wrapperStyleLeft: CSSProperties = {
    backgroundColor: 'transparent',
    height: '100vh',
    margin: '0px',
    width: '38.5%'
};
const wrapperStyleRight: CSSProperties = {
    backgroundColor: 'transparent',
    height: '100vh',
    margin: '0px',
    width: '38.5%'
};