import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import UserProfile from "./UserProfile";
import UserSchduler from "./UserSchduler";
import MakeSchedule from "./MakeSchedule";
import { Avatar } from "@mui/material";
const Home = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 3 }}>
      <Grid container spacing={5}>
        <Grid item xs={12} md={8} lg={9}>
          <MakeSchedule />
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
            <UserSchduler />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
