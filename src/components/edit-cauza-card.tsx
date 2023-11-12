import { Button, Card, CardContent, Typography } from "@mui/material";
import { Cause } from "../shared/Types";
import {deleteCauseAPI, getUserCauseAPI} from "../api/CauseAPI";

export const EditCauzaCard = ({ cauza }: { cauza: Cause }) => {
    const handleDelete=()=>{
        try {
            if(cauza.id)
                deleteCauseAPI(cauza.id).then(r => console.log(r));
        } catch (error) {
            console.log("Error fetching user causes");
        }
    }

    return (
        <Card sx={{display: 'flex'}}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    {cauza.titlu}
                </Typography>
                <Typography color="textSecondary">
                    Location: {cauza.locatie}
                </Typography>
                <Typography variant="body2" component="p">
                    Description: {cauza.descriere}
                </Typography>
                <Typography variant="body2" component="p">
                    Minimum Amount: {cauza.sumaMinima}
                </Typography>
                <Typography variant="body2" component="p">
                    Amount Raised: {cauza.sumaStransa}
                </Typography>
                <Typography variant="body2" component="p">
                    Currency: {cauza.moneda}
                </Typography>
            </CardContent>
            <CardContent>

                <Button sx={{background: '#B23374','&:hover': {
                        backgroundColor: '#7F113C',
                    }, color: 'black'}} onClick={handleDelete}>
                    Delete
                </Button>
            </CardContent>

        </Card>
    );
};
