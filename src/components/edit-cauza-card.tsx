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
        <Card sx={{ display: 'flex', borderRadius: '10px', border: '1px solid #9999ff', marginTop: '20px', marginRight: '20px', marginLeft: '20px', opacity: '0.8'}}>
            <CardContent>
                <Typography variant="h5" component="h2" sx={{color: '#990073', fontWeight: 'bold', textTransform: 'none', fontFamily: 'Pacifico, cursive'}}>
                    {cauza.titlu}
                </Typography>
                <br></br>
                <Typography variant="body2" component="p" sx={{color: '#330066', fontWeight: 'bold'}}>
                    {cauza.descriere}
                </Typography>
                <br></br>
                <Typography variant="body2" component="p">
                    Location: {cauza.locatie}
                </Typography>
                <Typography variant="body2" component="p"> 
                    Minimum Amount: {cauza.sumaMinima} {cauza.moneda}
                </Typography>
                <Typography variant="body2" component="p">
                    Amount Raised: {cauza.sumaStransa} {cauza.moneda}
                </Typography>
            </CardContent>
            <CardContent sx={{ marginLeft: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Box mb={1}>
                    <Button sx={{ background: '#9999ff','&:hover': {
                        backgroundColor: '#ccccff'}, color: 'black'
                    }} 
                    onClick={handleUpdate}>
                    Update
                    </Button>
                </Box>
                <Button sx={{ background: '#9999ff','&:hover': {
                        backgroundColor: '#ccccff'}, color: 'black'
                    }}
                     onClick={handleDelete}>
                     Delete
                </Button>
            </CardContent>

        </Card>
    );
};
