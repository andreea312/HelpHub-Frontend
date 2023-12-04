import { Button, Container, Select, TextField, Typography } from '@mui/material';
import { CSSProperties, useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { UsersContext } from '../auth/RegisterProvider';
import { RegisteredUser } from "../shared/Types";
import { Label } from '@mui/icons-material';
import background from "./fundal-register.png";



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
        <div style={wrapperStyle1}>
            <Container sx={wrapperStyle2}>
                <Typography variant={'h3'} sx={{ fontFamily: 'Pacifico, cursive' }}>HelpHub</Typography>
                <Typography variant={'h4'}>Register</Typography>
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
                    type='password'
                />
                                <br></br>

                <TextField
                value={fullName}
                label='full name'
                onChange={handleFullName}

                />
                                 <br></br>
                Gender
                <Select 
                    sx={{width: '70%'}}
                    name="gender"
                    value={gender}
                    onChange={handleGender}
                    >
                    <option value="0" style={{  background: '#ccccff'}}>Male</option>
                    <option value="1" style={{ background: '#ccccff'}}>Female</option>
                    <option value="2" style={{ background: '#ccccff'}}>Other</option>
                </Select>

                <br></br>

                <Button sx={{ background: '#9999ff','&:hover': {
                        backgroundColor: '#ccccff',
                    }, color: 'black',  textTransform: 'none', width: '30%', fontFamily: 'Pacifico, cursive'}} onClick={handleRegister}>Register</Button>
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