import React, { useContext, useEffect, useState, ChangeEvent } from "react";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  CircularProgress,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { CauzaCard } from "../components/cauza-card";
import { CausesContext } from "../shared/CauseProvider";
import { AuthContext } from "../auth/AuthProvider";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

import 'google-fonts'
import background from "./fundal-cauze.png";
import { Cause } from "../shared/Types";

export const CausesPage = () => {
  const { user, logout } = useContext(AuthContext);
  const { causes, getCauses, fetching } = useContext(CausesContext);
  const navigate = useNavigate();

  const [locationFilter, setLocationFilter] = useState<string>("");

  useEffect(() => {
    if (!user.id) {
      navigate("/");
    }
  }, [user.id]);

  const fetchCauses = async () => {
    try {
      await getCauses?.();
    } catch (error) {
      console.log("Error fetching causes", error);
    }
  };

  useEffect(() => {
    console.log("fetching...");
    if (user.id) fetchCauses();
  }, []);

  const filterCausesByLocation = (cause: Cause) => {
    return cause.locatie.toLowerCase().includes(locationFilter.toLowerCase());
  };

  const handleAddClick = () => {
    navigate("/add");
  };
  const handleAccountClick = () => {
    navigate("/mycauses");
  };

  const handleLogout = () => {
    logout?.();
  };

  const handleHelpHubClick = () => {
    navigate("/causes");
  };

  const handleClasamentClick = () => {
    navigate("/clasament");
  };

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLocationFilter(event.target.value);
  };

  if (fetching) {
    return (
      <Box>
        <CircularProgress />
        <p>Loading...</p>
      </Box>
    );
  }

  const commonAppBarStyles = {
    background: "#9999ff",
    height: "3%",
  };

  return (
    <Box style={{ backgroundImage: `url(${background})`, backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
      <AppBar position="static" sx={commonAppBarStyles}>
        <Toolbar sx={{ justifyContent: "flex-end", background: "#9999ff" }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: "Pacifico, cursive", cursor: "pointer" }} onClick={handleHelpHubClick}>
            HelpHub
          </Typography>
          <Tooltip title="">
          <input
            type="text"
            placeholder="Filter by location"
            value={locationFilter}
            onChange={handleFilterChange}
            style={{
                marginRight: "10px",
                padding: "8px",
                borderRadius: "20px",
                border: "none",
                outline: "none",
                backgroundColor: "rgba(255, 255, 255, 0.7)",
            }}
            />
          </Tooltip>
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

      {causes?.filter(filterCausesByLocation).map((cause, index) => (
        <CauzaCard key={cause.id} cauza={cause} />
      ))}
    </Box>
  );
};
