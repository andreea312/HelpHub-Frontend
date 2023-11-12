import {Card, CardContent, Typography} from "@mui/material";
import {Cause} from "../shared/Types";

export const CauzaCard = ({ cauza }: { cauza: Cause } ) => {
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
            </CardContent>
        </Card>
    );
};