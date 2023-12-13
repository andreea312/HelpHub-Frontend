import {Box, Button, Card, CardContent, FormControl, IconButton, InputLabel, LinearProgress, MenuItem, Modal, Select, TextField, Typography} from "@mui/material";
import {Cause} from "../shared/Types";
import { useContext, useEffect, useState } from "react";
import { CausesContext } from "../shared/CauseProvider";
import {User} from "../shared/Types";
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import CancelIcon from '@mui/icons-material/Cancel';
import SadFaceIcon from '@mui/icons-material/MoodBad';
import HappyFaceIcon from '@mui/icons-material/Mood';
import { AuthContext } from "../auth/AuthProvider";
import { donateToCauseAPI } from "../api/CauseAPI";
import InputAdornment from '@mui/material/InputAdornment';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EventIcon from '@mui/icons-material/Event';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import PaymentsIcon from '@mui/icons-material/Payments';
import LocationIcon from '@mui/icons-material/LocationOn';


export const CauzaCard = ({ cauza }: { cauza: Cause } ) => {
    const { user } = useContext(AuthContext);
    const { getPicture } = useContext(CausesContext);
    const [imageUrl, setImageUrl] = useState('');
    const [isModalOpen, setModalOpen] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [expiryMonth, setExpiryMonth] = useState('');
    const [expiryYear, setExpiryYear] = useState('');
    const [cvv, setCvv] = useState('');
    const [percentage, setPercentage] = useState(((cauza.sumaStransa || 0) /cauza.sumaMinima) * 100);
    const [sumaStransa, setSumaStransa] = useState(cauza.sumaStransa);
    const [currency, setCurrency] = useState(cauza.moneda);
    const [sumaDonata, setSumaDonata] = useState(0);

    const [errors, setErrors] = useState({
        cardNumber: '',
        expiryYear: '',
        expiryMonth: '',
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
            const rawImage = await getUrl();
            console.log("rawUrl:", rawImage);
            if (rawImage) {
                const dataUrl = URL.createObjectURL(rawImage);
                setImageUrl(dataUrl);
            }
        };
        fetchData();
    }, [cauza.poze]);


    const validateCardNumber = () => {
        if (!/^\d{16}$/.test(cardNumber)) {
            setErrors((prevErrors) => ({ ...prevErrors, cardNumber: 'Invalid card number' }));
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, cardNumber: '' }));
        }
    };

    const validateExpiryMonth = () => {
        const month = parseInt(expiryMonth, 10);
        if (!(month >= 1 && month <= 12)) {
            setErrors((prevErrors) => ({ ...prevErrors, expiryMonth: 'Invalid month' }));
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, expiryMonth: '' }));
        }
    };
    
    const validateExpiryYear = () => {
        const currentYear = (new Date().getFullYear()) % 100;
        const year = (parseInt(expiryYear, 10)) % 100;
    
        if (!(year >= currentYear && year <= currentYear + 10)) {
            setErrors((prevErrors) => ({ ...prevErrors, expiryYear: 'Invalid year' }));
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, expiryYear: '' }));
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
        validateExpiryMonth();
        validateExpiryYear();
        validateCvv();
        if (!errors.cardNumber && !errors.expiryYear && !errors.expiryMonth && !errors.cvv) {
            handleDonate();
        }
    };


    const handleDonate = () => {
        if (cauza.id && user.id){
            const result = donateToCauseAPI(cauza.id, user.id, sumaDonata, currency);
            console.log(result)

            if (sumaStransa){

                const updatedSumaStransa = sumaStransa + sumaDonata;
                const updatedPercentage = (updatedSumaStransa / cauza.sumaMinima) * 100;
                setSumaStransa(updatedSumaStransa);
                setPercentage(updatedPercentage);
            }
            closeModal();
        }
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
                            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 500, height: 700, borderRadius: '10px', border: '1px solid #9999ff', backgroundColor: '#e6e6ff', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer', color: '#990073' }}>
                                    <CancelIcon onClick={closeModal} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '40px', flex: 1 }}>
                                    <Typography variant="h5" component="h2" sx={{ color: '#990073', fontWeight: 'bold', textTransform: 'none', fontFamily: 'Pacifico, cursive', textAlign: 'center' }}>
                                        Donate for "{cauza.titlu}" charity cause
                                    </Typography>
                                    <br></br> 

                                    {/* Donation amount and currency fields */}
                                    <TextField margin="dense"  label="Amount" variant="outlined" value = {sumaDonata} onChange={(e) => setSumaDonata(parseInt(e.target.value))} type="number" fullWidth />
                                    <FormControl margin="dense" variant="outlined" fullWidth>
                                        <InputLabel>Currency</InputLabel>
                                        <Select label="Currency" value={currency} onChange={(e) => setCurrency(e.target.value)}>
                                            <MenuItem value="GBP">RON</MenuItem>
                                            <MenuItem value="EUR">EUR</MenuItem>
                                            <MenuItem value="USD">USD</MenuItem>
                                        </Select>
                                    </FormControl>
                                    
                                    {/* Card details */}
                                    <TextField
                                        label="Card Holder Name"
                                        variant="outlined"
                                        margin="dense" 
                                        fullWidth
                                        InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                            <PersonIcon />
                                            </InputAdornment>
                                        ),
                                        }}
                                    />
                                    <TextField
                                        label="Card Number"
                                        variant="outlined"
                                        margin="dense" 
                                        fullWidth
                                        value={cardNumber}
                                        onChange={(e) => setCardNumber(e.target.value)}
                                        onBlur={validateCardNumber}
                                        error={Boolean(errors.cardNumber)}
                                        helperText={errors.cardNumber}
                                        InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                            <CreditCardIcon />
                                            </InputAdornment>
                                        ),
                                        }}
                                    />
                                    <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                                        <TextField
                                            label="Month"
                                            variant="outlined"
                                            margin="dense" 
                                            fullWidth
                                            value={expiryMonth}
                                            onChange={(e) => setExpiryMonth(e.target.value)}
                                            onBlur={validateExpiryMonth}
                                            error={Boolean(errors.expiryMonth)}
                                            helperText={errors.expiryMonth}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <EventIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />

                                        <TextField
                                            label="Year"
                                            variant="outlined"
                                            margin="dense" 
                                            fullWidth
                                            value={expiryYear}
                                            onChange={(e) => setExpiryYear(e.target.value)}
                                            onBlur={validateExpiryYear}
                                            error={Boolean(errors.expiryYear)}
                                            helperText={errors.expiryYear}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <EventIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </div>
                                    <TextField
                                        label="CVC"
                                        variant="outlined"
                                        margin="dense"
                                        fullWidth
                                        value={cvv}
                                        onChange={(e) => setCvv(e.target.value)}
                                        onBlur={validateCvv}
                                        error={Boolean(errors.cvv)}
                                        helperText={errors.cvv}
                                        InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                            <LockIcon />
                                            </InputAdornment>
                                        ),
                                        }}
                                    />

                                    {/* Icons for secure payment */}
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
                                        <PaymentsIcon sx={{ width: '20px', height: '20px', marginRight: '5px' }} />
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
                    <Typography variant="body2" component="p" sx={{ display: 'flex', alignItems: 'center' }}>
                        <LocationIcon sx={{ fontSize: '17px', color: '#999999', marginRight: '5px' }} />
                        {cauza.locatie}
                    </Typography>
                    <Typography variant="body2" component="p">
                        Minimum Amount: {cauza.sumaMinima} {cauza.moneda}
                    </Typography>
                    <Typography variant="body2" component="p">
                        Amount Raised: {sumaStransa} {cauza.moneda}
                    </Typography>

                    {/* Linear Progress with Sad and Happy Icons */}
                    
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px' }}>
                        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                            <LinearProgress variant="determinate" value={percentage} sx={{ width: '90%' }} />
                            {/* Conditional rendering for happy or sad face */}
                            {percentage >= 50 ? (
                                <HappyFaceIcon sx={{ fontSize: '20px', color: '#555555' }} />
                            ) : (
                                <SadFaceIcon sx={{ fontSize: '20px', color: '#555555' }} />
                            )}
                            <Typography variant="body2" sx={{ color: '#555555', marginLeft: '5px' }}>{percentage.toFixed(2)}%</Typography>
                        </div>
                    </div>

                </div>
            </CardContent>
        </Card>
    );
};

