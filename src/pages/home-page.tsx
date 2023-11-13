import {Button, Container, TextField, Typography} from '@mui/material';
import {CSSProperties, useState} from "react";
import { useNavigate } from 'react-router-dom';
export const HomePage=()=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const handleLogin=()=>{
        navigate('/donations')
    }
    const handleEmail = (event: any) => {
        setEmail(event.target.value);
    }
    const handlePassword = (event: any) => {
        setPassword(event.target.value);
    }
    return(
        <>
            <Container sx={textWrapperStyle}>
                <Typography variant={'h3'} > Hi!</Typography>

                <Typography variant={'h3'}>This is help hub</Typography>
                <TextField
                value={email}
                label='email'
                onChange={handleEmail}

                />
                <TextField
                    value={password}
                    label='password'
                    onChange={handlePassword}

                />
                <Button sx={{ background: '#B23374','&:hover': {
                        backgroundColor: '#7F113C',
                    }, color: 'black'}} onClick={handleLogin}>Log in</Button>
            </Container>
        </>
    )
}
const textWrapperStyle: CSSProperties = {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: '70vh',
};