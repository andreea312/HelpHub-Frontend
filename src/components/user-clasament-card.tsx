import { Card, CardContent, Typography } from "@mui/material";
import { User } from "../shared/Types";
import profile from "./profile.png";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import { getUserDetails } from "../api/UserAPI";
import { UserDetails, InitialUserDetails } from "../shared/Types";

export const UserClasamentCard = ({ user, position }: { user: User, position: number }) => {
  const [userDetails, setUserDetails] = useState<UserDetails>(InitialUserDetails);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetails: UserDetails = await getUserDetails(user);
        setUserDetails(userDetails);
      } catch (error) {
        console.log("Error fetching user details");
      }
    };

    if (user.id) {
      fetchUserDetails();
    }
  }, [user]);

  return (
    <Card
      sx={{
        width: "700px",
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
        <div style={{ flex: "15%", marginTop: "20px", marginRight: "30px", textAlign: "center" }}>
          <Typography variant="h2" component="p" sx={{ color: "#573B8C" }}>
            {position.toString()}
          </Typography>
        </div>

        <div style={{ flex: "15%", marginTop: "10px" }}>
          <img
            src={profile}
            alt="Profile"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </div>
        <div
          style={{
            flex: "70%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            marginLeft: "50px",
            marginRight: "10px",
          }}
        >
          <Typography
            variant="body1"
            component="p"
            sx={{ color: "#330066", fontWeight: "bold" }}
          >
            {userDetails.username}
          </Typography>
          <Typography
            variant="h4" 
            component="p"
            sx={{ color: "#330066", fontWeight: "bold", marginTop: "5px" }}
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
        </div>
      </CardContent>
    </Card>
  );
};
