import {CSSProperties, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Box, Button, TextField, Typography, Dialog, DialogContent, Container} from "@mui/material";
import {InsertPhoto} from '@mui/icons-material';
import {Cause, CauseUpdate} from "../shared/Types";
import {updateCauseAPI, getCauseByIdAPI} from "../api/CauseAPI";

export const UpdateDonationPage = () => {
    const {causeId} = useParams();
    const [cause, setCause] = useState<CauseUpdate | null>(null);
    const [id, setId] = useState<number>(0);
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [minimumSum, setMinimumSum] = useState<number | "">('');
    const [sumaStransa, setSumaStransa] = useState<number>(0);
    const [image, setImage] = useState<Array<string>>(new Array<string>());
    const [currency, setCurrency] = useState('');
    const [sustinator, setSustinator] = useState<number>(0);
    const [errorMsg, setErrorMsg] = useState('');
    const [updateClicked, setUpdateClicked] = useState(false);

    useEffect(() => {
        const fetchCause = async () => {
            try {
                const response = await getCauseByIdAPI(Number(causeId));
                setCause(response);
                if (response) {
                    console.log("responseee", response)
                    setTitle(response.titlu || '');
                    setDescription(response.descriere || '');
                    setLocation(response.locatie || '');
                    setMinimumSum(Number(response.sumaMinima) || '');
                    setCurrency(response.moneda || '');
                    setImage(response.poze || []);
                    setSustinator(response.nrSustinatori || 0);
                    // Fetch sumaStransa here if needed
                }
            } catch (error) {
                console.log("Error fetching cause data");
            }
        };

        fetchCause();
    }, [causeId]);

    const handleUpdateCause = async () => {
        try {
            // Fetch sumaStransa from the current cause or from another source if needed

            await updateCauseAPI(Number(causeId), {
                id: id,
                descriere: description,
                titlu: title,
                locatie: location,
                sumaMinima: Number(minimumSum),
                sumaStransa: sumaStransa,
                moneda: currency,
                nrSustinatori: sustinator,
                poze: image
            });

            setUpdateClicked(true);
        } catch (error) {
            console.log("Error updating cause");
            setErrorMsg("Failed to update cause. Please try again.");
        }
    };

    const handleClosePopup = () => {
        setUpdateClicked(false);
        setErrorMsg('');
    };

    // const onImageChange = (event: any) => {
    //     if (event.target.files && event.target.files[0]) {
    //         setImage(URL.createObjectURL(event.target.files[0]));
    //     }
    // };

    return (
        <Container sx={textWrapperStyle}>
            <h1>Update Charity Cause</h1>
            <TextField sx={{marginBottom: "15px", width:"50vw"}} label="Title" onChange={(e) => setTitle(e.target.value)} required
                       value={title}/>
            <TextField sx={{marginBottom: "15px", width:"50vw"}} label="Description" onChange={(e) => setDescription(e.target.value)}
                       required
                       value={description}/>
            <TextField sx={{marginBottom: "15px", width:"50vw"}} label="Location" onChange={(e) => setLocation(e.target.value)}
                       required value={location}/>
            <TextField
                sx={{marginBottom: "15px", width:"50vw"}}
                label="Sum"
                onChange={(e) => setMinimumSum(e.target.value !== '' ? parseFloat(e.target.value) : '')}
                required
                value={minimumSum !== '' ? minimumSum.toString() : ''}
            />
            <TextField  sx={{marginBottom: "15px", width:"50vw"}} label="Currency" onChange={(e) => setCurrency(e.target.value)} required value={currency}/>
            <Button
                sx={{
                    marginBottom: "5vh", background: '#B23374', '&:hover': {
                        backgroundColor: '#7F113C',
                    }, color: 'black', width: "15vw"
                }}
                type="submit"
                onClick={handleUpdateCause}
            >
                Update Cause
            </Button>

            <Dialog open={updateClicked} onClose={handleClosePopup}>
                <DialogContent>
                    {errorMsg ? <Typography> Error: {errorMsg}</Typography> : <Typography> Cause updated successfully</Typography>}
                </DialogContent>
            </Dialog>

        </Container>
    );
};

const textWrapperStyle: CSSProperties = {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: '90vh'
}
