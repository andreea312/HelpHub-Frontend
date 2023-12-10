import {Box, Button, Card, CardContent, FormControl, IconButton, InputLabel, LinearProgress, MenuItem, Modal, Select, TextField, Typography} from "@mui/material";
import {Cause} from "../shared/Types";
import { useContext, useEffect, useState } from "react";
import { CausesContext } from "../shared/CauseProvider";
import {User} from "../shared/Types";
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import CancelIcon from '@mui/icons-material/Cancel';
import PaymentIcon from '@mui/icons-material/Payment';



export const CauzaCard = ({ cauza }: { cauza: Cause } ) => {
    const { getPicture } = useContext(CausesContext);
    const [imageUrl, setImageUrl] = useState('');
    const [isModalOpen, setModalOpen] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [percentage, setPercentage] = useState(0);


    // State for validation errors
    const [errors, setErrors] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
    });

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
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
            if (cauza.sumaStransa == null){
                cauza.sumaStransa  = 0
            }
            const newPercentage = (cauza.sumaStransa / cauza.sumaMinima) * 100;
            setPercentage(newPercentage);
        };
        fetchData();
    }, [cauza.poze, cauza.sumaStransa, cauza.sumaMinima]);


    const validateCardNumber = () => {
        if (!/^\d{16}$/.test(cardNumber)) {
        setErrors((prevErrors) => ({ ...prevErrors, cardNumber: 'Invalid card number' }));
        } else {
        setErrors((prevErrors) => ({ ...prevErrors, cardNumber: '' }));
        }
    };

    const validateExpiryDate = () => {
        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
        setErrors((prevErrors) => ({ ...prevErrors, expiryDate: 'Invalid expiry date' }));
        } else {
        setErrors((prevErrors) => ({ ...prevErrors, expiryDate: '' }));
        }
    };

    const validateCvv = () => {
        if (!/^\d{3}$/.test(cvv)) {
        setErrors((prevErrors) => ({ ...prevErrors, cvv: 'Invalid CVV' }));
        } else {
        setErrors((prevErrors) => ({ ...prevErrors, cvv: '' }));
        }
    };

    const handleDonateClick = () => {
        validateCardNumber();
        validateExpiryDate();
        validateCvv();
        if (!errors.cardNumber && !errors.expiryDate && !errors.cvv) {
        handleDonate();
        }
    };


    const handleDonate = () => {
      };


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
                    <div style={{display: 'flex', flex: '80%', marginBottom: '10px'}}>
                        <Typography variant="h5" component="h2" sx={{color: '#990073', fontWeight: 'bold', textTransform: 'none', fontFamily: 'Pacifico, cursive'}}>
                            {cauza.titlu}
                        </Typography>

                        <IconButton sx={{marginLeft: '20px', color: '#9999ff', '&:hover': {color: '#330066'}}} onClick={openModal}>
                            <VolunteerActivismIcon />
                        </IconButton>


                        <Modal open={isModalOpen} onClose={closeModal}>
                            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, height: 700, borderRadius: '10px', border: '1px solid #9999ff', backgroundColor: '#e6e6ff', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer', color: '#990073' }}>
                                    <CancelIcon onClick={closeModal} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '40px', flex: 1 }}>
                                    <Typography variant="h5" component="h2" sx={{ color: '#990073', fontWeight: 'bold', textTransform: 'none', fontFamily: 'Pacifico, cursive', textAlign: 'center' }}>
                                        Donate for "{cauza.titlu}" charity cause
                                    </Typography>
                                    <br></br> 
                                    {/* Donation amount and currency fields */}
                                    <TextField label="Amount" variant="outlined" margin="normal" type="number" fullWidth />
                                    <FormControl variant="outlined" margin="normal" fullWidth>
                                        <InputLabel>Currency</InputLabel>
                                        <Select label="Currency">
                                            <MenuItem value="GBP">RON</MenuItem>
                                            <MenuItem value="EUR">EUR</MenuItem>
                                            <MenuItem value="USD">USD</MenuItem>
                                        </Select>
                                    </FormControl>
                                    
                                    {/* Card details */}
                                    <TextField
                                        label="Card Number"
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        value={cardNumber}
                                        onChange={(e) => setCardNumber(e.target.value)}
                                        onBlur={validateCardNumber}
                                        error={Boolean(errors.cardNumber)}
                                        helperText={errors.cardNumber}
                                    />
                                    <TextField
                                        label="Expiration Date"
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        value={expiryDate}
                                        onChange={(e) => setExpiryDate(e.target.value)}
                                        onBlur={validateExpiryDate}
                                        error={Boolean(errors.expiryDate)}
                                        helperText={errors.expiryDate}
                                    />
                                    <TextField
                                        label="CVV"
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        value={cvv}
                                        onChange={(e) => setCvv(e.target.value)}
                                        onBlur={validateCvv}
                                        error={Boolean(errors.cvv)}
                                        helperText={errors.cvv}
                                    />

                                    {/* Icons for secure payment */}
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
                                        <PaymentIcon sx={{ width: '20px', height: '20px', marginRight: '5px' }} />
                                        <Typography variant="body2" sx={{ color: '#555555' }}>Secure Payment</Typography>
                                    </div>
                                
                                    {/* Donate button */}
                                    <Button variant="contained" sx={{ background: '#9999ff', '&:hover': { backgroundColor: '#ccccff' }, color: 'black', marginTop: '20px' }} onClick={handleDonateClick}>
                                        Donate
                                    </Button>
                                </div>
                            </Box>
                        </Modal>



                        
                    </div>

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

                    <LinearProgress variant="determinate" value={percentage} sx={{ marginTop: '10px' }} />

                </div>
            </CardContent>
        </Card>
    );
};