import { Button, Card, CardContent, Typography } from "@mui/material";
import { User } from "../shared/Types";
import profile from "./profile.png";
import EditIcon from "@mui/icons-material/Edit";

export const UserCard = ({ user }: { user: User }) => {
  return (
    <Card
      sx={{
        width: "400px",
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
            Name: {user.fullName}
          </Typography>
          <Typography
            variant="body1"
            component="p"
            sx={{ color: "#330066", fontWeight: "bold" }}
          >
            Username: {user.username}
          </Typography>
          <Typography
            variant="body1"
            component="p"
            sx={{ color: "#330066", fontWeight: "bold" }}
          >
            Email: {user.email}
          </Typography>
          <Typography
            variant="body1"
            component="p"
            sx={{ color: "#330066", fontWeight: "bold" }}
          >
            Gender: {user.gender}
          </Typography>
          <Typography
            variant="body1"
            component="p"
            sx={{ color: "#330066", fontWeight: "bold" }}
          >
            Points: {user.coins}
          </Typography>
          <Typography
            variant="body1"
            component="p"
            sx={{ color: "#330066", fontWeight: "bold" }}
          >
            Level: {user.level}
          </Typography>
        </div>
        <div
          style={{
            position: "absolute",
            top: "20px",
            right: "10px",
          }}
        >
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
          >
            <EditIcon sx={{ fontSize: 24 }} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
