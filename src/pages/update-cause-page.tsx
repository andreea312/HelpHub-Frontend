import {CSSProperties, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Box, Button, TextField, Typography, Dialog, DialogContent, Container, AppBar, Toolbar, Tooltip, IconButton} from "@mui/material";
import {InsertPhoto} from '@mui/icons-material';
import {Cause, CauseUpdate} from "../shared/Types";
import {updateCauseAPI, getCauseByIdAPI, savePicturesForCause} from "../api/CauseAPI";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";
import { useContext } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import background from "./fundal-edit-add.png";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { CausesContext } from "../shared/CauseProvider";


export const UpdateCausePage = () => {
    const { getPicture } = useContext(CausesContext);
    const { logout } = useContext(AuthContext);
    const {causeId} = useParams();
    const [cause, setCause] = useState<CauseUpdate | null>(null);
    const [id, setId] = useState<number>(0);
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [minimumSum, setMinimumSum] = useState<number | "">('');
    const [sumaStransa, setSumaStransa] = useState<number>(0);
    const [images, setImages] = useState<File[]>([]);
    const [currency, setCurrency] = useState('');
    const [sustinator, setSustinator] = useState<number>(0);
    const [errorMsg, setErrorMsg] = useState('');
    const [updateClicked, setUpdateClicked] = useState(false);
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState('');

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
                    //setImages(response.poze || []);
                    // Convert array of strings to array of File objects
                    setImages(response.poze || []);
                    setSustinator(response.nrSustinatori || 0);
                    setSumaStransa(response.sumaStransa || 0);
                }
            } catch (error) {
                console.log("Error fetching cause data");
            }
        };

        fetchCause();
    }, [causeId]);

    const getUrl = async () => {
        if(cause?.poze && getPicture){
            const url = cause?.poze[0] as any;
            if(url && url.url){
                console.log(url, 'cauza', cause.id);
                const rawUrl = await getPicture(url.url as string);
                return rawUrl;
            }
            return null;
        }
    }

    useEffect(()=>{
        if(cause?.poze){

            if(cause.poze.length > 0){
        const fetchData = async () => {
            const fileArray = [];
            const rawImage = await getUrl();
            const dataUrl = cause.poze!.at(0) as any;
            console.log("rawImage:", rawImage);
            const parts = dataUrl.url.split('/');
            console.log("fileName: ", parts[parts.length - 1].slice(2));
            const goodUrl = parts[parts.length - 1].slice(2);
            const image = new File([rawImage], goodUrl, { type: rawImage.type });
            console.log("Image: ", image);
            fileArray.push(image);
            if (rawImage) {
                setImageUrl(URL.createObjectURL(rawImage));
                setImages(fileArray);
            }
        };
        fetchData();
    }
    }
    }, [cause?.poze]);

    const handleUpdateCause = async () => {
        try {
            // Fetch sumaStransa from the current cause or from another source if needed
            console.log("!!!!!saving images: ", images);

            await updateCauseAPI(Number(causeId), {
                id: id,
                descriere: description,
                titlu: title,
                locatie: location,
                sumaMinima: Number(minimumSum),
                sumaStransa: sumaStransa,
                moneda: currency,
                nrSustinatori: sustinator,
                poze: images
            });
            console.log(images.length)
            await savePicturesForCause(Number(causeId), images);
            
            setUpdateClicked(true);
            
        } catch (error) {
            console.log("Error updating cause");
            setErrorMsg("Failed to update cause. Please try again.");
        }
    };

    const onImageChange = (event: any) => {
        if (event.target.files) {
            const selectedFiles = Array.from(event.target.files) as File[];
            console.log(selectedFiles);
            setImageUrl(URL.createObjectURL(selectedFiles[0]))
            setImages(selectedFiles);
        }
    }

    const handleClosePopup = () => {
        setUpdateClicked(false);
        setErrorMsg('');
        navigate('/myCauses');
    };

    // const onImageChange = (event: any) => {
    //     if (event.target.files && event.target.files[0]) {
    //         setImage(URL.createObjectURL(event.target.files[0]));
    //     }
    // };

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

    const handleClasamentClick = () => {
        navigate('/clasament')
    }; 

    const commonAppBarStyles = {
        background: '#9999ff',
        height: '3%',
    };

    useEffect(() => {
        // Cleanup function to revoke the object URL
        return () => {
            if (images.length > 0) {
                URL.revokeObjectURL(URL.createObjectURL(new Blob(images)));
            }
        };
    }, [images]);

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: "100%"}}>
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
                    <Tooltip title="Clasament">
                        <IconButton color="inherit" onClick={handleClasamentClick}>
                            <EmojiEventsIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Logout">
                        <IconButton color="inherit" onClick={handleLogout}>
                            <LogoutIcon />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>
        <Container sx={textWrapperStyle}>
            <h1 style={{color: '#990073', fontWeight: 'bold', textTransform: 'none', fontFamily: 'Pacifico, cursive'}}>Update Charity Cause</h1>
            <br></br>
            <br></br>
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
                <img src={imageUrl} width="100" height="100" alt="preview image" />
            }
            
            <br></br>
            <br></br>
            <Button
                sx={{
                    marginBottom: "5vh", background: '#9999ff', '&:hover': {
                        backgroundColor: '#ccccff',
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
        </Box>
    );
};

const textWrapperStyle: CSSProperties = {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    paddingTop: '0vh',
}