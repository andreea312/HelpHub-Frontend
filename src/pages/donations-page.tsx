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


export const DonationsPage = () => {
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
        fetchCauses();
    }, []);

    const handleAddClick = () => {
        navigate('/add')
    };
    const handleAccountClick = () => {
        navigate('/mydonations')
    };

    const handleLogout = () => {
        logout?.();
    }

    if(fetching){
        return (
            <Box>
                <CircularProgress />
                <p>Loading...</p>
            </Box>
        )
    }

    const commonAppBarStyles = {
        background: '#B23374',
        height: '3%',
    };

    return (
        <Box>
            <AppBar position="static" sx={commonAppBarStyles}>
                <Toolbar sx={{ justifyContent: 'flex-end', background: '#B23374' }}>
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
            <Typography variant={'h3'} sx={{ color: 'black' }}>
                Charity causes:
            </Typography>
            {causes?.map((cause, index) => (
                <CauzaCard key={index} cauza={cause} />
            ))}
        </Box>
    );
}