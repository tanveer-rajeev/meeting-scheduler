import React, { useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import Modal from "react-modal";
import { useHistory } from "react-router-dom";
import axios from "axios";

const CreateRoom = () => {
  const [modalShow, setModalShow] = useState(true);
  //   Modal.setAppElement("#root");
  const history = useHistory();

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

  const openModal = () => {
    setModalShow(true);
  };
  const closeModal = () => {
    history.push("/rooms");
  };

  const [room, setRoom] = useState({
    bookingDate: new Date(),
    startTime: "",
    endTime: "",
    roomName: "",
  });

  const handleSubmit = () => {
    axios
      .post(`http://localhost:8080/rooms`, {
        headers: {
          pragma: sessionStorage.getItem("token"),
        },
      })
      .then(() => {
        closeModal();
      });
  };

  return (
    <Modal isOpen={openModal} onRequestClose={closeModal} style={customStyles}>
      <h1>Add New Room</h1>

      <Form onSubmit={handleSubmit} className="room-section">
        <legend className="p-2 ">Room</legend>
        <select
          size="lg"
          className="mb-2"
          value={room.roomName}
          onChange={(e) => setRoom({ ...room, roomName: e.target.value })}
          id="rooms"
        >
          <option value="Official">Official Meeting</option>
          <option value="Team">Team Meeting</option>
          <option value="Client">Client Meeting</option>
          <option value="Interview">Interview</option>
        </select>
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
            className="p-2 "
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
    
      </Form>

      <Button onClick={closeModal}>Close</Button>
    </Modal>
  );
};

export default CreateRoom;
