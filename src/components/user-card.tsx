import {Button, Card, CardContent, Typography} from "@mui/material";
import {User} from "../shared/Types";
import { useContext, useEffect, useState } from "react";
import { CausesContext } from "../shared/CauseProvider";
import profile from "./profile.png";


export const UserCard = ({ user }: { user: User } ) => {

    return (
            <Card sx={{
                width: '450px',
                justifyContent: 'center',
                align: 'center',
                borderRadius: '10px',
                border: '1px solid #9999ff',
                marginTop: '20px',
                marginRight: 'auto', // Center horizontally
                marginLeft: 'auto', // Center horizontally
                opacity: '0.8'
            }}>           
            <CardContent sx={{ display: 'flex'}}>
                <div style={{ flex: '20%', margin: '10px'}}>
                    <img
                        src={profile}
                        alt="Profile"
                        style={{ maxWidth: '100%', maxHeight: '100%' }}
                    />
                    <Button sx={{ marginLeft: '20px', marginTop: '10px', marginRight: '10px', marginBottom: '10px', background: '#9999ff','&:hover': {
                        backgroundColor: '#ccccff'}, color: 'black', textTransform: 'none'
                     }}
                    // onClick={handleEdit}>
                    >
                     Edit
                    </Button>
                </div>
                <div style={{ flex: '80%', marginLeft: '40px', marginTop: '10px', marginRight: '10px', marginBottom: '10px'}}>
                    <Typography variant="body1" component="p" sx={{color: '#330066', fontWeight: 'bold'}}>
                        Name: {user.fullName}
                    </Typography>
                    <Typography variant="body1" component="p" sx={{color: '#330066', fontWeight: 'bold'}}>
                        Username: {user.username}
                    </Typography>
                    <Typography variant="body1" component="p" sx={{color: '#330066', fontWeight: 'bold'}}>
                        Email: {user.email}
                    </Typography>
                    <Typography variant="body1" component="p" sx={{color: '#330066', fontWeight: 'bold'}}>
                        Gender: {user.gender}
                    </Typography>
                    <Typography variant="body1" component="p" sx={{color: '#330066', fontWeight: 'bold'}}>
                        Points: {user.coins}
                    </Typography>
                    <Typography variant="body1" component="p" sx={{color: '#330066', fontWeight: 'bold'}}>
                        Level: {user.level}
                    </Typography>
                </div>
            </CardContent>
        </Card>
    );
};