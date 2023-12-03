import { useEffect, useState, useContext } from "react";
import {AppBar, Box, Typography} from "@mui/material";
import {Cause} from "../shared/Types";
import {getUserCauseAPI} from "../api/CauseAPI";
import {EditCauzaCard} from "../components/edit-cauza-card";
import { AuthContext } from "../auth/AuthProvider";
import { useNavigate } from "react-router-dom";

export const MyDonationsPage = () => {
    const { user } = useContext(AuthContext);
    const [cauze, setCauze] = useState<Cause[]>([]);
    const navigate = useNavigate();
    
    useEffect(()=> {
        if(!user.id){
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
    const commonAppBarStyles = {
        background: '#B23374',
        height: '9vh',
    };

    return (
        <Box>
            <AppBar position="static" sx={commonAppBarStyles}> </AppBar>
                <Typography variant={'h3'} sx={{color: 'black'}}>
                    My Charity Causes
                </Typography>
                {cauze.map((cauza) => (
                    <EditCauzaCard key={cauza.id} cauza={cauza} onDelete={handleCauseDelete}/>
                ))}

        </Box>
    );
}