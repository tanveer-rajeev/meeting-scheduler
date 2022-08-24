import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { JWT_Decode } from "../Utilities/LoggedInUserInfo";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

function UserProfile() {
  const [user, setUser] = useState({});
  useEffect(() => {
    const name = JWT_Decode();
    axios
      .get(`http://localhost:8080/users/byName/${name}`, {
        headers: {
          Pragma: sessionStorage.getItem("token"),
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const { username, phoneNumber, department } = user;
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={9}>
        Username
        <Item>{username}</Item>
      </Grid>
      <Grid item xs={12} sm={9}>
        PhoneNumber
        <Item>{phoneNumber}</Item>
      </Grid>
      <Grid item xs={12} sm={9}>
        Department
        <Item>{department}</Item>
      </Grid>
    </Grid>
  );
}

export default UserProfile;
