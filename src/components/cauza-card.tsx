import {Card, CardContent, Typography} from "@mui/material";
import {Cause} from "../shared/Types";
import { useContext, useEffect, useState } from "react";
import { CausesContext } from "../shared/CauseProvider";

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
        <Card>
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
                <div>
                    {imageUrl && 
                    <img
                        src={imageUrl}
                        alt="Some image"
                        style={{ maxWidth: '30%', maxHeight: '30%' }}
                    />
                    }
                </div>
            </CardContent>
        </Card>
    );
};