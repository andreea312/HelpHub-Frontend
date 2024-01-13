import { Button, Card, CardContent, Typography, Modal, Box, TextField, InputAdornment } from "@mui/material";
import { User } from "../shared/Types";
import profile from "./profile.png";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import { getUserDetails, updateUserAPI } from "../api/UserAPI";
import { UserDetails, InitialUserDetails } from "../shared/Types";
import { useNavigate } from "react-router-dom";
import CancelIcon from '@mui/icons-material/Cancel';


export const UserCard = ({ user }: { user: User }) => {
  const [userDetails, setUserDetails] = useState<UserDetails>(InitialUserDetails);

  const [usernamee, setUsernamee] = useState('');
  const [fullNamee, setFullNamee] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetails: UserDetails = await getUserDetails(user);
        setUserDetails(userDetails);
        setUsernamee(userDetails.username || '');
        setFullNamee(userDetails.fullName || '');
      } catch (error) {
        console.log("Error fetching user details");
      }
    };

    if (user.id) {
      fetchUserDetails();
    }
  }, [user]);

  const handleUpdateUserClick = async () => {
    try {
      await updateUserAPI(Number(user.id), {
        id: user.id,
        username: usernamee,
        email: user.email,
        parola: user.parola,
        fullName: fullNamee,
        gender: user.gender,
        points: user.points,
        nrDonations: user.nrDonations
      });
      userDetails.username = usernamee;
      userDetails.fullName = fullNamee;
      setUserDetails(userDetails);
      //console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
      setIsModalOpen(false);
    } catch (error) {
      console.log("Error updating user");
    }
  };

  const handleEditUserClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Card
        sx={{
          maxWidth: "30%",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "10px",
          border: "1px solid #9999ff",
          marginTop: "20px",
          marginRight: "auto",
          marginLeft: "auto",
          opacity: "0.8",
          position: "relative",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <div style={{ flex: "30%", marginTop: "40px" }}>
            <img
              src={profile}
              alt="Profile"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          </div>
          <div
            style={{
              flex: "80%",
              marginLeft: "40px",
              marginTop: "10px",
              marginRight: "10px",
              marginBottom: "10px",
            }}
          >
            <Typography
              variant="body1"
              component="p"
              sx={{ color: "#330066", fontWeight: "bold" }}
            >
              Name: {userDetails.fullName}
            </Typography>
            <Typography
              variant="body1"
              component="p"
              sx={{ color: "#330066", fontWeight: "bold" }}
            >
              Username: {userDetails.username}
            </Typography>
            <Typography
              variant="body1"
              component="p"
              sx={{ color: "#330066", fontWeight: "bold" }}
            >
              Email: {userDetails.email}
            </Typography>
            <Typography
              variant="body1"
              component="p"
              sx={{ color: "#330066", fontWeight: "bold" }}
            >
              Gender: {userDetails.gender}
            </Typography>
            <Typography
              variant="body1"
              component="p"
              sx={{ color: "#330066", fontWeight: "bold" }}
            >
              Points: {userDetails.points}
            </Typography>
            <Typography
              variant="body1"
              component="p"
              sx={{ color: "#330066", fontWeight: "bold" }}
            >
              Donations: {userDetails.nrDonations}
            </Typography>
          </div>
          <div
            style={{
              position: "absolute",
              top: "20px",
              right: "10px",
            }}
          >
            {/* EDIT USER BUTTON */}
            <Button
              sx={{
                margin: 0,
                padding: 0,
                minWidth: 0,
                background: "none",
                "&:hover": {
                  backgroundColor: "none",
                },
              }}
              onClick={handleEditUserClick}
            >
              <EditIcon sx={{ fontSize: 24 }} />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Modal for editing user details */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 300, height: 320, borderRadius: '10px', border: '1px solid #9999ff', backgroundColor: '#e6e6ff', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer', color: '#990073' }}>
                  <CancelIcon onClick={handleCloseModal} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '40px', flex: 1 }}>
                  <Typography variant="h5" component="h2" sx={{ color: '#990073', fontWeight: 'bold', textTransform: 'none', fontFamily: 'Pacifico, cursive', textAlign: 'center' }}>
                      Edit profile
                  </Typography>
                  <br></br> 

                  <TextField
                      label="Edit Name"
                      variant="outlined"
                      margin="dense" 
                      fullWidth
                      value={fullNamee}
                      onChange={(e) => setFullNamee(e.target.value)}
                      InputProps={{
                      startAdornment: (
                          <InputAdornment position="start">
                          </InputAdornment>
                      ),
                      }}
                  />

                  <TextField
                      label="Edit Username"
                      variant="outlined"
                      margin="dense" 
                      fullWidth
                      value={usernamee}
                      onChange={(e) => setUsernamee(e.target.value)}
                      InputProps={{
                      startAdornment: (
                          <InputAdornment position="start">
                          </InputAdornment>
                      ),
                      }}
                  />
              
                  {/* Donate button */}
                  <Button variant="contained" sx={{ background: '#9999ff', '&:hover': { backgroundColor: '#ccccff' }, color: 'black', marginTop: '20px' }} onClick={handleUpdateUserClick}>
                      Update
                  </Button>
              </div>
          </Box>
      </Modal>
    </>
  );
};
