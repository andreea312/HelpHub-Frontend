import {Box, Button, Card, CardContent, Typography} from "@mui/material";
import { Cause } from "../shared/Types";
import {deleteCauseAPI, getUserCauseAPI, updateCauseAPI} from "../api/CauseAPI";
import {useNavigate} from "react-router-dom";

export const EditCauzaCard = ({ cauza, onDelete }: { cauza: Cause, onDelete: (causeId: number) => void  }) => {
    const navigate = useNavigate();
    const handleDelete = async () => {
        try {
            if (cauza.id) {
                await deleteCauseAPI(cauza.id);
                onDelete(cauza.id);
            }
        } catch (error) {
            console.log("Error deleting cause");
        }
    };

    const handleUpdate = async () => {
            navigate(`/update/${cauza.id}`); // Pass the cause ID to the update route
    };

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
                <Box mb={1}>
                    <Button sx={{
                        background: '#B23374', '&:hover': {
                            backgroundColor: '#7F113C',
                        }, color: 'black'
                    }} onClick={handleUpdate}>
                        Update
                    </Button>
                </Box>
                <Button sx={{
                    background: '#B23374', '&:hover': {
                        backgroundColor: '#7F113C',
                    }, color: 'black'
                }} onClick={handleDelete}>
                    Delete
                </Button>
            </CardContent>

        </Card>
    );
};
