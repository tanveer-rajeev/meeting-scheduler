import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import UserProfile from "./UserProfile";
import UserSchduler from "./UserSchduler";
import MakeSchedule from "./MakeSchedule";
import { JWT_Decode } from "../Utilities/LoggedInUserInfo";
import axios from "axios";

export const RenderContext = React.createContext();

const Home = () => {
  const [displayBookings, setDisplayBookings] = React.useState([]);
  const [render, setRender] = React.useState(false);

  const handleRendering = () => {
    setRender((prev) => !prev);
  };

  const effectHandler = async () => {
    console.log("EffectHandler");
    const username = JWT_Decode();
    await axios
      .get(`http://localhost:8080/api/users/allBookings/${username}`, {
        headers: {
          Pragma: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setDisplayBookings(res.data);
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    console.log("use Effect hit");
    effectHandler();
  }, [render]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 3 }}>
      <Grid container spacing={5}>
        <Grid item xs={12} md={8} lg={9}>
          <MakeSchedule addBookings={handleRendering} />
        </Grid>

        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "row",
              height: 290,
              alignItems: "center",
            }}
          >
            <UserProfile />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <UserSchduler
              displayBookings={displayBookings}
              handleRendering={handleRendering}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
