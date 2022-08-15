import React, { useContext, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { ListItem } from "@mui/material";
import { UserContext } from "../../../App";
import axios from "axios";
function UserProfile() {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [user, setUser] = useState({});

  useEffect(() => {
    const username = JSON.stringify(loggedInUser.name);
    let name = username.slice(1, username.length - 1);
    axios
      .get(`http://localhost:8080/users/byName/${name}`, {
        headers: {
          Pragma: sessionStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((err) => console.log(err.message));
  }, [loggedInUser]);
  const { username, phoneNumber, department } = user;
  return (
    <div>
      <Grid xs={12} md={6}>
        <Card xs={5}>Username - {username}</Card>
        <Card xs={2}>Phone - {phoneNumber}</Card>
        <Card xs={2}>Dept. - {department}</Card>
      </Grid>
    </div>
  );
}

export default UserProfile;
