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
    <div>
      {showRoom.map((room) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  );
};

export default DisplayRooms;
