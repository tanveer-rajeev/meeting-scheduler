import { Container, Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import API from "../Server_API/API";
import RoomCard from "./RoomCard";

const DisplayRooms = () => {
  const [showRoom, setShowRoom] = useState([]);
  const [render, setRender] = useState(false);

  const handleRendering = () => {
    setRender((prev) => !prev);
  };

  const effectHandler = async () => {
    await axios
      .get(API.get.getAllRooms, {
        headers: {
          pragma: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setShowRoom(response.data);
      });
  };

  useEffect(() => {
    effectHandler();
  }, [render]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 3 }}>
      <Grid container spacing={3}>
        {showRoom.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            handleRendering={handleRendering}
          />
        ))}
      </Grid>
    </Container>
  );
};

export default DisplayRooms;
