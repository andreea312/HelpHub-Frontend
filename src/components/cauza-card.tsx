import {Card, CardContent, Typography} from "@mui/material";
import {Cause} from "../shared/Types";
import { useContext, useEffect, useState } from "react";
import { CausesContext } from "../shared/CauseProvider";
import {User} from "../shared/Types";


export const CauzaCard = ({ cauza }: { cauza: Cause } ) => {
    const { getPicture } = useContext(CausesContext);
    const [imageUrl, setImageUrl] = useState('');

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

    return (
        <Card sx={{ borderRadius: '10px', border: '1px solid #9999ff', marginTop: '20px', marginRight: '20px', marginLeft: '20px', opacity: '0.8'}}>
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
                    <Typography variant="body2" component="p">
                        Location: {cauza.locatie}
                    </Typography>
                    <Typography variant="body2" component="p">
                        Minimum Amount: {cauza.sumaMinima} {cauza.moneda}
                    </Typography>
                    <Typography variant="body2" component="p">
                        Amount Raised: {cauza.sumaStransa} {cauza.moneda}
                    </Typography>
                </div>
            </CardContent>
        </Card>
    );
};