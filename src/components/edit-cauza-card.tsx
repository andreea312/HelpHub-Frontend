import {Box, Button, Card, CardContent, Typography} from "@mui/material";
import { Cause } from "../shared/Types";
import {deleteCauseAPI, getUserCauseAPI, updateCauseAPI} from "../api/CauseAPI";
import {useNavigate} from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CausesContext } from "../shared/CauseProvider";
import LocationIcon from '@mui/icons-material/LocationOn';


export const EditCauzaCard = ({ cauza, onDelete }: { cauza: Cause, onDelete: (causeId: number) => void  }) => {
    const { getPicture } = useContext(CausesContext);
    const [imageUrl, setImageUrl] = useState('');
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
    
    const getUrl = async () => {
        if(cauza.poze && getPicture){
            const url = cauza.poze[0] as any;
            if(url && url.url){
                console.log(url, 'cauza', cauza.id);
                const rawUrl = await getPicture(url.url as string);
                return rawUrl;
            }
            return null;
        }
    }

    useEffect(()=>{
        const fetchData = async () => {
            const rawUrl = await getUrl();
            if (rawUrl) {
                const dataUrl = URL.createObjectURL(rawUrl);
                setImageUrl(dataUrl);
            }
        };
        fetchData();
    }, [cauza.poze]);

    const handleUpdate = async () => {
            navigate(`/update/${cauza.id}`); // Pass the cause ID to the update route
    };

    return (
        <Card sx={{ display: 'flex', borderRadius: '10px', border: '1px solid #9999ff', marginTop: '20px', marginRight: '20px', marginLeft: '20px', opacity: '0.8'}}>
            <CardContent sx={{ display: 'flex'}}>
                <div style={{ flex: '20%', margin: '10px'}}>
                    {imageUrl && 
                        <img
                            src={imageUrl}
                            alt="Some image"
                            style={{ maxWidth: '100%', maxHeight: '100%' }}
                        />
                    }
                </div>
                <div style={{ flex: '80%', margin: '10px'}}>
                    <Typography variant="h5" component="h2" sx={{color: '#990073', fontWeight: 'bold', textTransform: 'none', fontFamily: 'Pacifico, cursive'}}>
                        {cauza.titlu}
                    </Typography>
                    <br></br>
                    <Typography variant="body2" component="p" sx={{color: '#330066', fontWeight: 'bold'}}>
                        {cauza.descriere}
                    </Typography>
                    <br></br>
                    <Typography variant="body2" component="p" sx={{ display: 'flex', alignItems: 'center' }}>
                        <LocationIcon sx={{ fontSize: '17px', color: '#999999', marginRight: '5px' }} />
                        {cauza.locatie}
                    </Typography>
                    <Typography variant="body2" component="p">
                        Minimum Amount: {cauza.sumaMinima} {cauza.moneda}
                    </Typography>
                    <Typography variant="body2" component="p">
                        Amount Raised: {cauza.sumaStransa} {cauza.moneda}
                    </Typography>
                </div>
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
