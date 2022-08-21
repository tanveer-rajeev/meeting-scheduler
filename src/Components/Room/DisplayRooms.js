import { Container, Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import RoomCard from "./RoomCard";

const DisplayRooms = () => {
  const [showRoom, setShowRoom] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/rooms`, {
        headers: {
          pragma: sessionStorage.getItem("token"),
        },
      })
      .then((response) => {
        setShowRoom(response.data);
      });
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 3 }}>
      <Grid container spacing={3}>
        {showRoom.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </Grid>
    </Container>
  );
};

export default DisplayRooms;
