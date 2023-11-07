import {
    AppBar,
    Box,
    Button,
    Container,
    FormControlLabel,
    FormGroup, IconButton, Menu, MenuItem,
    Switch,
    TextField, Toolbar, Tooltip,
    Typography
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';


export const DonationsPage = () => {
    const navigate = useNavigate();
    // Function for the Add icon
    const handleAddClick = () => {
        navigate('/add')
    };

    // Function for the Account icon
    const handleAccountClick = () => {
        navigate('/mydonations')
    };

    return (
        <Box>
            <AppBar position="static">
                <Toolbar sx={{ justifyContent: 'flex-end' , background:'#B23374'}}>
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
                </Toolbar>
            </AppBar>
            <h1>Donations</h1>
        </Box>
    )
}