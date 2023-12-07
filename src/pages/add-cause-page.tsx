import { useContext, useState, useEffect } from "react";
import { TextField, Button, Box, Typography, Dialog, DialogContent, AppBar, Toolbar, Tooltip, IconButton } from "@mui/material";
import { InsertPhoto } from '@mui/icons-material';
import { Cause } from "../shared/Types";
import { addCauseAPI } from "../api/CauseAPI";
import { useNavigate } from "react-router-dom";
import './AddPage.css';
import { CausesContext } from "../shared/CauseProvider";
import { AuthContext } from "../auth/AuthProvider";
import background from "./fundal-edit-add.png";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';


export const AddCausePage = () => {
    const { user, logout } = useContext(AuthContext);
    const { addCause, fetchingError } = useContext(CausesContext);
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [minimumSum, setMinimumSum] = useState('');
    const [images, setImages] = useState<File[]>([]);
    const [currency, setCurrency] = useState(''); 
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    console.log('here', user);

    useEffect(()=> {
        if(!user.id){
            navigate('/');   
        }
    }, [user.id]);

    const handleAddCause = async () => {
        // TO DO: Call to BE - parseFloat for mininum sum + handle error?
        try{
            console.log(images);
            const cause: Cause = {
                descriere: description,
                titlu: title,
                locatie: location,
                sumaMinima: parseInt(minimumSum),
                sumaStransa: 0,
                moneda: currency,
                poze: images
            }
            console.log(cause);
            console.log('current user: ', user);
            await addCause?.(user.id!, cause);
            console.log('added cause!!');
            navigate('/myCauses');
        } catch(error: any){
            console.log('error: '+error);
            setErrorMsg(fetchingError?.message || 'Error at add!');
        }
    }

    const handleClose = () => {
        setErrorMsg('');
    }

    const onImageChange = (event: any) => {
        if (event.target.files) {
            const selectedFiles = Array.from(event.target.files) as File[];
            console.log(selectedFiles);
            setImages(selectedFiles);
        }
    }

    const handleAddClick = () => {
        navigate('/add')
    };
    const handleAccountClick = () => {
        navigate('/mycauses')
    };

    const handleLogout = () => {
        logout?.();
    }

    const handleHelpHubClick = () => {
        navigate('/causes')
    };

    const commonAppBarStyles = {
        background: '#9999ff',
        height: '3%',
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
            <AppBar position="static" sx={commonAppBarStyles}>
                <Toolbar sx={{ justifyContent: 'flex-end', background: '#9999ff'}}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: 'Pacifico, cursive', cursor: 'pointer'}} onClick={handleHelpHubClick}>
                    HelpHub
                </Typography>
                    <Tooltip title="Add charity cause">
                        <IconButton color="inherit" onClick={handleAddClick}>
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="My charity causes">
                        <IconButton color="inherit" onClick={handleAccountClick}>
                            <AccountCircleIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Logout">
                        <IconButton color="inherit" onClick={handleLogout}>
                            <LogoutIcon />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>
            <h1 style={{color: '#990073', fontWeight: 'bold', textTransform: 'none', fontFamily: 'Pacifico, cursive'}}>Add New Charity Cause</h1>
            <br></br>
            <form className="form">
                <label className="formLabel" style={{color: '#990073', fontWeight: 'bold', textTransform: 'none', fontFamily: 'Pacifico, cursive'}}>
                    Title: </label>
                <TextField
                    label="Title"
                    onChange={e => setTitle(e.target.value)}
                    required
                    value={title}
                />
                <label className="formLabel" style={{color: '#990073', fontWeight: 'bold', textTransform: 'none', fontFamily: 'Pacifico, cursive'}}>
                    Description: </label>
                <TextField 
                    label="Description"
                    onChange={e => setDescription(e.target.value)}
                    required
                    value={description}
                />
                <label className="formLabel" style={{color: '#990073', fontWeight: 'bold', textTransform: 'none', fontFamily: 'Pacifico, cursive'}}>
                    Location: </label>
                <TextField 
                    label="Location"
                    onChange={e => setLocation(e.target.value)}
                    required
                    value={location}
                />
                <label className="formLabel" style={{color: '#990073', fontWeight: 'bold', textTransform: 'none', fontFamily: 'Pacifico, cursive'}}>
                    Miminum Sum: </label>
                <TextField 
                    label="Sum"
                    onChange={e => setMinimumSum(e.target.value)}
                    required
                    value={minimumSum}
                />
                <label className="formLabel"  style={{color: '#990073', fontWeight: 'bold', textTransform: 'none', fontFamily: 'Pacifico, cursive'}}>
                    Currency: </label>
                <TextField 
                    label="Currency"
                    onChange={e => setCurrency(e.target.value)}
                    required
                    value={currency}
                />
            </form>
            <Button variant="contained" component="label" sx={{marginBottom: "5vh", background: '#9999ff','&:hover': {
                    backgroundColor: '#ccccff',
                }, color: 'black'}}>
                <InsertPhoto></InsertPhoto> Choose Picture
                <input
                    type="file"
                    hidden
                    onChange={onImageChange}
                />
            </Button>
            {images.length > 0 && 
                <img src={URL.createObjectURL(images[0])} width="100" height="100" alt="preview image" />
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