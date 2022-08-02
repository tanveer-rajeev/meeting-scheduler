import React, { useContext, useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { AddBooking } from "../Booking/AddBooking";
import { UserContext } from "../../App";
import "./Room.css";
import Modal from "react-modal";

const Room = ({ openModal, closeModal, id }) => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [room, setRoom] = useState({
    bookingDate: new Date(),
    startTime: "",
    endTime: "",
    roomName: "",
  });
  console.log(id);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    AddBooking(id, room, JSON.stringify(loggedInUser.name));
    closeModal();
  };

  return (
    <Modal isOpen={openModal} onRequestClose={closeModal} style={customStyles}>
      <div>
        <Form onSubmit={handleSubmit} className="room-section">
          <legend className="p-2 ">Booking Date</legend>
          <br />
          <FormControl
            value={room.bookingDate}
            onChange={(e) => setRoom({ ...room, bookingDate: e.target.value })}
            className="p-2"
            type="date"
            placeholder="/ /"
            required
          />
          <br />
          <fieldset>
            <legend className="p-2 "> Start Time</legend>
            <FormControl
              className="p-2"
              type="time"
              value={room.startTime}
              onChange={(e) => setRoom({ ...room, startTime: e.target.value })}
            />
          </fieldset>
          <br />
          <fieldset>
            <legend className="p-2 "> End Time</legend>
            <FormControl
              className="p-2 "
              type="time"
              value={room.endTime}
              onChange={(e) => setRoom({ ...room, endTime: e.target.value })}
            />
          </fieldset>

          <br />
          <FormControl type="submit" />
        </Form>
        <Button onClick={closeModal}>Close</Button>
      </div>
    </Modal>
  );
};

export default Room;
