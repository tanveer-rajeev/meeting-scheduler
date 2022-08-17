import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import UserProfile from "./UserProfile";
import UserSchduler from "./UserSchduler";
const Home = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        Profile
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            <UserProfile />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          Your Scheduled
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <UserSchduler />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
