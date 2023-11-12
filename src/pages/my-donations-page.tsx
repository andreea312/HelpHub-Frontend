import {useEffect, useState} from "react";
import axios from "axios";
import {CauzaCard} from "../components/cauza-card";
import {Box, Typography} from "@mui/material";
import {Cause} from "../shared/Types";
import {getUserCauseAPI} from "../api/CauseAPI";

export const MyDonationsPage=()=>{
    const userId = 1; // TODO: Replace with actual user ID
    const [cauze, setCauze] = useState<Cause[]>([]);
    const fetchUserCauses = async () => {
        try {
            const response = await getUserCauseAPI();
            setCauze(response);
        } catch (error) {
            console.log("Error fetching user causes");
        }
    };
    useEffect(() => {
        fetchUserCauses();
    }, [userId]);
    const causesHardcoded: Cause[] = [
        {
            id: 1,
            descriere: "Strangere de fonduri pentru renovarea scolilor",
            titlu: "Renovare Scoli",
            locatie: "Orasul X",
            sumaMinima: 10000,
            sumaStransa: 5000,
            moneda: "EUR"
        }
    ];
    return (
        <Box>
            <Typography variant={'h3'} sx={{background:'#B23374'}}>My Charity Causes</Typography>
            {causesHardcoded.map((cauza) => (
                <CauzaCard key={cauza.id} cauza={cauza} />
            ))}
        </Box>
    )
}