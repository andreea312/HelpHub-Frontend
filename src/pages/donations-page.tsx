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

    // Function for the Account icon
    const handleAccountClick = () => {
        navigate('/mydonations')
    };
    const causesHardcoded: Cause[] = [
        {
            id: 1,
            descriere: "Strangere de fonduri pentru renovarea scolilor",
            titlu: "Renovare Scoli",
            locatie: "Orasul X",
            sumaMinima: 10000,
            sumaStransa: 5000,
            moneda: "EUR"
        },
        {
            id: 2,
            descriere: "Ajutor pentru victimele inundatiilor",
            titlu: "Inundatii Ajutor",
            locatie: "Regiunea Y",
            sumaMinima: 15000,
            sumaStransa: 8000,
            moneda: "EUR"
        },
        {
            id: 3,
            descriere: "Campanie de plantare arbori",
            titlu: "Plantam Impreuna",
            locatie: "Zona Verde",
            sumaMinima: 5000,
            sumaStransa: 2000,
            moneda: "EUR"
        }
    ];
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

            {causesHardcoded.map((cause) => (
                <CauzaCard key={cause.id?.toString()} cauza={cause} />
            ))}
        </Box>
    )
}