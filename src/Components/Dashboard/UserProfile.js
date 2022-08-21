import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import axios from "axios";
import PersonIcon from "@mui/icons-material/Person";
import LocalPhoneTwoToneIcon from "@mui/icons-material/LocalPhoneTwoTone";
import { JWT_Decode } from "../Utilities/JWT_Decode";
import { Avatar, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  // textAlign: "right",
  color: theme.palette.text.secondary,
}));

function UserProfile() {
  const [user, setUser] = useState({});
  // const classes = useStyles();
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
    <Box sx={{ flexGrow: 3 }}>
      <Grid container spacing={1}>
        <Avatar
          alt="Remy Sharp"
          src="/broken-image.jpg"
          sx={{ width: 88, height: 88 }}
          align="center"
        />
        <Grid item xs={12} sm={9}>
          <Item>
            <PersonIcon /> {username}
          </Item>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Item>
            <LocalPhoneTwoToneIcon /> {phoneNumber}
          </Item>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Item>Dept. - {department}</Item>
        </Grid>
      </Grid>
    </Box>
  );
}

export default UserProfile;
