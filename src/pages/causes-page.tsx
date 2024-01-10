import {
    AppBar,
    Box,
    IconButton,
    Toolbar, Tooltip, CircularProgress, Typography
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import {CauzaCard} from '../components/cauza-card';
import {Cause} from "../shared/Types";
import {useContext, useEffect, useState} from "react";
import {getAllCauseAPI} from "../api/CauseAPI";
import { CausesContext } from '../shared/CauseProvider';
import { AuthContext } from '../auth/AuthProvider';
import 'google-fonts'
import background from "./fundal-cauze.png";



export const CausesPage = () => {
    const { user, logout } = useContext(AuthContext);
    const { causes, getCauses, fetching } = useContext(CausesContext);
    const navigate = useNavigate();

    useEffect(()=> {
        if(!user.id){
            navigate('/');   
        }
    }, [user.id]);

    const fetchCauses = async () => {
        try {
            await getCauses?.();
        } catch (error) {
            console.log("Error fetching causes", error);
        }
    };

    useEffect(() => {
        console.log('fetching...');
        if(user.id)
            fetchCauses();
    }, []);

    const handleAddClick = () => {
        navigate('/add')
    };
    const handleAccountClick = () => {
        navigate('/mycauses')
    };

    const handleLogout = () => {
        logout?.();
    }

    const handleHelpHubClick = () => {
        navigate('/causes')
    };

    if(fetching){
        return (
            <Box>
                <CircularProgress />
                <p>Loading...</p>
            </Box>
        )
    }

    const commonAppBarStyles = {
        background: '#9999ff',
        height: '3%',
    };

    return (
        <Box style={{backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
            <AppBar position="static" sx={commonAppBarStyles}>
                <Toolbar sx={{ justifyContent: 'flex-end', background: '#9999ff'}}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: 'Pacifico, cursive', cursor: 'pointer' }} onClick={handleHelpHubClick}>
                    HelpHub
                </Typography>
                    <Tooltip title="Add charity cause">
                        <IconButton color="inherit" onClick={handleAddClick}>
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="My charity causes">
                        <IconButton color="inherit" onClick={handleAccountClick}>
                            <AccountCircleIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Logout">
                        <IconButton color="inherit" onClick={handleLogout}>
                            <LogoutIcon />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>
          
            {causes?.map((cause, index) => (
                <CauzaCard key={index} cauza={cause}/>
            ))}
           
        </Box>
    );
}