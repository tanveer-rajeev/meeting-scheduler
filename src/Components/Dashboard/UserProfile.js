import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import axios from "axios";
import PersonIcon from "@mui/icons-material/Person";
import LocalPhoneTwoToneIcon from "@mui/icons-material/LocalPhoneTwoTone";
import { JWT_Decode } from "../Utilities/JWT_Decode";

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
    <div>
      <Grid item xs={12} md={6}>
        <Card xs={5}>
          <PersonIcon /> {username}
        </Card>
        <Card xs={2}>
          <LocalPhoneTwoToneIcon /> {phoneNumber}
        </Card>
        <Card xs={2}>Dept. - {department}</Card>
      </Grid>
    </div>
  );
}

export default UserProfile;
