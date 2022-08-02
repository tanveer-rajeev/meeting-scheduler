import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Sidebar from "../Sidebar/Sidebar";
import axios from "axios";
import RoomCard from "./RoomCard";
import "./DisplayRooms.css";
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
      <Row className="display-room">
        <Col md={3}>
          <Sidebar />
        </Col>

        <Col md={9}>
          <Row>
            {showRoom.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default DisplayRooms;
