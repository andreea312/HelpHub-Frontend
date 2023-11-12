import {
    AppBar,
    Box,
    IconButton,
    Toolbar, Tooltip,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import {CauzaCard} from '../components/cauza-card';
import {Cause} from "../shared/Types";
import {useEffect, useState} from "react";
import {getAllCauseAPI} from "../api/CauseAPI";


export const DonationsPage = () => {
    const [causes, setCauses] = useState<Cause[]>([]);    //TODO uncomment this line
    const navigate = useNavigate();
    const fetchCauses = async () => {
        try {
            const causesData = await getAllCauseAPI();
            setCauses(causesData); // Set the state with the fetched data
        } catch (error) {
            console.log("Error fetching causes", error);
        }
    };
    useEffect(() => {
        fetchCauses();
    }, []);
    const handleAddClick = () => {
        navigate('/add')
    };
    const handleAccountClick = () => {
        navigate('/mydonations')
    };
    return (
        <Box>
            <AppBar position="static">
                <Toolbar sx={{ justifyContent: 'flex-end' , background:'#B23374'}}>
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
                </Toolbar>
            </AppBar>
            <h1>Charity causes:</h1>

            {causes.map((cause) => (
                <CauzaCard key={cause.id?.toString()} cauza={cause} />
            ))}
        </Box>
    )
}