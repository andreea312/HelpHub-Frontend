import { useEffect, useState, useContext } from "react";
import {AppBar, Box, Toolbar, Typography, Tooltip, IconButton} from "@mui/material";
import {Cause, User} from "../shared/Types";
import {getUserCauseAPI} from "../api/CauseAPI";
import {EditCauzaCard} from "../components/edit-cauza-card";
import { AuthContext } from "../auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import background from "./fundal-cauze.png";
import { UserCard } from "../components/user-card";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { getClasamentAPI } from "../api/UserAPI";
import { UserClasamentCard } from "../components/user-clasament-card";


export const ClasamentPage = () => {
    const {user, logout } = useContext(AuthContext);
    const [usersC, setUsersC] = useState<User[]>([]);
    const navigate = useNavigate();

    console.log("found user: ", user);
    useEffect(()=> {
        if(!user.id){
            console.log("id not found!!!")
            navigate('/');   
        }
    }, [user.id]);
    
    const fetchClasament = async () => {
        try {
            const response = await getClasamentAPI();
            console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAA");
            console.log(response);
            setUsersC(response);
        } catch (error) {
            console.log("Error fetching clasament");
        }
    };
    useEffect(() => {
        fetchClasament();
    }, []);
    
    const handleAddClick = () => {
        navigate('/add')
    };
    const handleAccountClick = () => {
        navigate('/mycauses')
    };

    const handleHelpHubClick = () => {
        navigate('/causes')
    };

    const handleClasamentClick = () => {
        navigate('/clasament')
    };

    const handleLogout = () => {
        logout?.();
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
                    <Tooltip title="Clasament">
                        <IconButton color="inherit" onClick={handleClasamentClick}>
                            <EmojiEventsIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Logout">
                        <IconButton color="inherit" onClick={handleLogout}>
                            <LogoutIcon />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>
            <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
                <Typography variant="h3" component="div" sx={{color: '#573B8C', marginBottom: '30px', marginTop: '30px', textTransform: 'uppercase' }}>
                    Top Donors
                </Typography>
            </Box>
            {usersC.map((userC, index) => (
                <UserClasamentCard key={userC.id} user={userC} position={index + 1}/>
            ))}
        </Box>
    );
}