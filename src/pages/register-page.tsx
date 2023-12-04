import { Button, Container, TextField, Typography } from '@mui/material';
import { CSSProperties, useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { UsersContext } from '../auth/RegisterProvider';
import { RegisteredUser } from "../shared/Types";
import { Label } from '@mui/icons-material';


export const RegisterPage=()=>{
    const { addUser } = useContext(UsersContext);
    const [email, setEmail] = useState('');
    const [parola, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [gender, setGender] = useState('');
    const navigate = useNavigate();


    const handleRegister = async () => {
        try{
            const user: RegisteredUser = {
                username: username,
                email: email,
                parola: parola,
                fullName: fullName,
                gender: parseInt(gender),
                coins: 100,
                level: 1,
            }
            console.log(user);
            await addUser?.(user);
            console.log('added user!!');
            navigate('/');
        } catch(error: any){
            console.log('error: '+ error);
        }
    }
    const handleUsername = (event: any) => {
        setUsername(event.target.value);
    }
    const handleEmail = (event: any) => {
        setEmail(event.target.value);
    }
    const handlePassword = (event: any) => {
        setPassword(event.target.value);
    }
    const handleFullName = (event: any) => {
        setFullName(event.target.value);
    }
    const handleGender = (event: any) => {
        setGender(event.target.value);
    }
    return(
        <>
            <Container sx={textWrapperStyle}>
                <Typography variant={'h3'} > Register</Typography>
                <br></br>

                <TextField
                value={email}
                label='email'
                onChange={handleEmail}

                />
                                <br></br>

                <TextField
                value={username}
                label='username'
                onChange={handleUsername}

                />
                                <br></br>

                <TextField
                    value={parola}
                    label='password'
                    onChange={handlePassword}

                />
                                <br></br>

                <TextField
                value={fullName}
                label='full name'
                onChange={handleFullName}

                />
                                <br></br>

                
                <TextField
                value={gender}
                label='gender'
                onChange={handleGender}

                />
                <br></br>

                <Button sx={{ background: '#B23374','&:hover': {
                        backgroundColor: '#7F113C',
                    }, color: 'black'}} onClick={handleRegister}>Register</Button>
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