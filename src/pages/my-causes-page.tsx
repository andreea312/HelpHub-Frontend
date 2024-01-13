import { useEffect, useState, useContext } from "react";
import { AppBar, Box, Toolbar, Typography, Tooltip, IconButton } from "@mui/material";
import { Cause, Achievement } from "../shared/Types";
import { getUserCauseAPI } from "../api/CauseAPI";
import { EditCauzaCard } from "../components/edit-cauza-card";
import { AuthContext } from "../auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import background from "./fundal-cauze.png";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { UserCard } from "../components/user-card";
import { getAchievmentsAPI, userGotAchievementAPI } from "../api/AchievmentAPI";
import { InitialUserDetails, UserDetails } from "../shared/Types";
import { getUserDetails } from "../api/UserAPI";

export const MyCausesPage = () => {
    const { user, logout } = useContext(AuthContext);
    const [cauze, setCauze] = useState<Cause[]>([]);
    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [userAchievements, setUserAchievements] = useState<number[]>([]);
    const [userDetails, setUserDetails] = useState<UserDetails>(InitialUserDetails);

    const navigate = useNavigate();

    useEffect(() => {
        if (!user.id) {
            console.log("id not found!!!");
            navigate('/');
        }
    }, [user.id, navigate]);

    const fetchUserCauses = async () => {
        try {
            const response = await getUserCauseAPI(user.id!);
            setCauze(response);
        } catch (error) {
            console.log("Error fetching user causes");
        }
    };

    useEffect(() => {
        fetchUserCauses();
    }, [user.id]);

    useEffect(() => {
        const fetchUserDetails = async () => {
          try {
            const userDetails: UserDetails = await getUserDetails(user);
            setUserDetails(userDetails);
            console.log("user details: ", userDetails);
            const filteredUserAchievements = userDetails.achievements.map(a => a.id!);
            setUserAchievements(filteredUserAchievements);
            console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
            console.log(filteredUserAchievements);
          } catch (error) {
            console.log("Error fetching user details");
          }
        };
    
        if (user.id) {
          fetchUserDetails();
        }
      }, [user]);

    const handleCauseDelete = (deletedCauseId: number) => {
        setCauze(cauze.filter((cause) => cause.id !== deletedCauseId));
    };

    const handleAddClick = () => {
        navigate('/add');
    };

    const handleAccountClick = () => {
        navigate('/mycauses');
    };

    const handleHelpHubClick = () => {
        navigate('/causes');
    };

    const handleLogout = () => {
        logout?.();
    };

    const handleClasamentClick = () => {
        navigate('/clasament');
    };

    const commonAppBarStyles = {
        background: '#9999ff',
        height: '3%',
    };

    return (
        <Box style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
            <AppBar position="static" sx={commonAppBarStyles}>
                <Toolbar sx={{ justifyContent: 'flex-end', background: '#9999ff' }}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: 'Pacifico, cursive', cursor: 'pointer' }} onClick={handleHelpHubClick}>
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

            <Box style={{ display: 'flex', alignItems: 'center', padding: '20px', maxWidth: '100%' }}>
                {/* User Card on the Left */}
                <UserCard key={user.id} user={user} />

                {/* Achievements on the Right */}
                <div style={{ display: 'flex', marginLeft: '20px', maxWidth: '70%' }}>
                    <div>
                        <img
                            src={require(`./1donation.png`)}
                            style={{
                                maxWidth: '200px',
                                height: '200px',
                                filter: userAchievements.includes(1) ? 'none' : 'blur(10px)',
                            }}
                        />
                    </div>

                    <div>
                        <img
                            src={require(`./5donations.png`)}
                            style={{
                                maxWidth: '200px',
                                height: '200px',
                                filter: userAchievements.includes(2) ? 'none' : 'blur(10px)',
                            }}
                        />
                    </div>

                    <div>
                        <img
                            src={require(`./10donations.png`)}
                            style={{
                                maxWidth: '200px',
                                height: '200px',
                                filter: userAchievements.includes(3) ? 'none' : 'blur(10px)',
                            }}
                        />
                    </div>

                    <div>
                        <img
                            src={require(`./100points.png`)}
                            style={{
                                maxWidth: '200px',
                                height: '200px',
                                filter: userAchievements.includes(4) ? 'none' : 'blur(10px)',
                            }}
                        />
                    </div>

                    <div>
                        <img
                            src={require(`./500points.png`)}
                            style={{
                                maxWidth: '200px',
                                height: '200px',
                                filter: userAchievements.includes(5) ? 'none' : 'blur(10px)',
                            }}
                        />
                    </div>
                </div>
            </Box>

            {cauze.map((cauza) => (
                <EditCauzaCard key={cauza.id} cauza={cauza} onDelete={handleCauseDelete} />
            ))}
        </Box>
    );
};
