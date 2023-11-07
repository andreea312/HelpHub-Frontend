import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { InsertPhoto } from '@mui/icons-material';
import './AddPage.css';

export const AddDonationPage = () => {
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [minimumSum, setMinimumSum] = useState('');
    const [image, setImage] = useState<string | null>(null);

    const handleAddCause = () => {
        // TO DO: Call to BE - parseFloat for mininum sum + handle error?
        alert('Clicked!');
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
            </form>
            <Button variant="contained" component="label" sx={{marginBottom: "5vh"}}>
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
        </Box>
    );
}