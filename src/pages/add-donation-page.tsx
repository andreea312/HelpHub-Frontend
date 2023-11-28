import { useContext, useState } from "react";
import { TextField, Button, Box, Typography, Dialog, DialogContent } from "@mui/material";
import { InsertPhoto } from '@mui/icons-material';
import { Cause } from "../shared/Types";
import { addCauseAPI } from "../api/CauseAPI";
import { useNavigate } from "react-router-dom";
import './AddPage.css';
import { CausesContext } from "../shared/CauseProvider";

export const AddDonationPage = () => {
    const { addCause, fetchingError } = useContext(CausesContext);
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [minimumSum, setMinimumSum] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const [currency, setCurrency] = useState(''); 
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    const handleAddCause = async () => {
        // TO DO: Call to BE - parseFloat for mininum sum + handle error?
        try{
            const cause: Cause = {
                descriere: description,
                titlu: title,
                locatie: location,
                sumaMinima: parseInt(minimumSum),
                sumaStransa: 0,
                moneda: currency,
                image: image
            }
            console.log(cause);
            await addCause?.(1, cause);
            console.log('added cause!!');
            navigate('/donations');
        } catch(error: any){
            console.log('error: '+error);
            setErrorMsg(fetchingError?.message || 'Error at add!');
        }
    }

    const handleClose = () => {
        setErrorMsg('');
    }

    const onImageChange = (event: any) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h1>Add New Charity Cause</h1>
            <form className="form">
                <label className="formLabel">Title: </label>
                <TextField 
                    label="Title"
                    onChange={e => setTitle(e.target.value)}
                    required
                    value={title}
                />
                <label className="formLabel">Description: </label>
                <TextField 
                    label="Description"
                    onChange={e => setDescription(e.target.value)}
                    required
                    value={description}
                />
                <label className="formLabel">Location: </label>
                <TextField 
                    label="Location"
                    onChange={e => setLocation(e.target.value)}
                    required
                    value={location}
                />
                <label className="formLabel">Miminum Sum: </label>
                <TextField 
                    label="Sum"
                    onChange={e => setMinimumSum(e.target.value)}
                    required
                    value={minimumSum}
                />
                <label className="formLabel">Currency: </label>
                <TextField 
                    label="Currency"
                    onChange={e => setCurrency(e.target.value)}
                    required
                    value={currency}
                />
            </form>
            <Button variant="contained" component="label" sx={{marginBottom: "5vh", background: '#B23374','&:hover': {
                    backgroundColor: '#7F113C',
                }, color: 'black'}}>
                <InsertPhoto></InsertPhoto> Choose Picture
                <input
                    type="file"
                    hidden
                    onChange={onImageChange}
                />
            </Button>
            {image && 
                <img src={image} width="100" height="100" alt="preview image" />
            }
            <Button 
                sx={{marginTop: "5vh"}}
                variant="outlined" 
                color="secondary" 
                type="submit" 
                onClick={handleAddCause}>
                    Add Cause
            </Button>
            <Dialog
                open={!!errorMsg}
                onClose={handleClose}>
                <DialogContent>
                    <Typography>
                        Error: {errorMsg}
                    </Typography>
                </DialogContent>
            </Dialog>
        </Box>
    );
}