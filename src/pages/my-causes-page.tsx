import { useEffect, useState, useContext } from "react";
import {AppBar, Box, Toolbar, Typography, Tooltip, IconButton} from "@mui/material";
import {Cause} from "../shared/Types";
import {getUserCauseAPI} from "../api/CauseAPI";
import {EditCauzaCard} from "../components/edit-cauza-card";
import { AuthContext } from "../auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import background from "./fundal-cauze.png";
import { UserCard } from "../components/user-card";


export const MyCausesPage = () => {
    const { user, logout } = useContext(AuthContext);
    const [cauze, setCauze] = useState<Cause[]>([]);
    const navigate = useNavigate();
    
    console.log("found user: ", user);
    useEffect(()=> {
        if(!user.id){
            console.log("id not found!!!")
            navigate('/');   
        }
    }, [user.id]);

    const fetchUserCauses = async () => {
        try {
            const response = await getUserCauseAPI(user.id!);
            setCauze(response);
        } catch (error) {
            console.log("Error fetching user causes");
        }
    };
    useEffect(() => {
        fetchUserCauses();
    }, [user.id]);
    // const causesHardcoded: Cause[] = [
    //     {
    //         id: 1,
    //         descriere: "Strangere de fonduri pentru renovarea scolilor",
    //         titlu: "Renovare Scoli",
    //         locatie: "Orasul X",
    //         sumaMinima: 10000,
    //         sumaStransa: 5000,
    //         moneda: "EUR"
    //     }
    // ];
    const handleCauseDelete = (deletedCauseId: Number) => {
        setCauze(cauze.filter((cause) => cause.id !== deletedCauseId));
    };

    const handleAddClick = () => {
        navigate('/add')
    };
    const handleAccountClick = () => {
        navigate('/mycauses')
    };

    const handleHelpHubClick = () => {
        navigate('/causes')
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
                    <Tooltip title="Logout">
                        <IconButton color="inherit" onClick={handleLogout}>
                            <LogoutIcon />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>
            
            <UserCard key={user.id} user={user}/>

            {cauze.map((cauza) => (
                <EditCauzaCard key={cauza.id} cauza={cauza} onDelete={handleCauseDelete}/>
            ))}

        </Box>
    );
}