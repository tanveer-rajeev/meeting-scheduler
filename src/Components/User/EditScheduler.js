import React, { useState } from "react";
import { Button, Form, FormControl, Modal } from "react-bootstrap";
import axios from "axios";
import { DeleteBooking } from "../Booking/AddBooking";

const EditScheduler = (props) => {
  const { id, startTime, endTime, bookingDate,roomName } = props.booking;
  const [updateBooking, setUpdateBooking] = useState({
    bookingDate: bookingDate,
    startTime: startTime,
    endTime: endTime,
  });

  const handleDeleteBooking = () => {
    DeleteBooking(id);
    props.onHide();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const bookingAPI = `http://localhost:8080/booking/${id}`;
    axios
      .put(
        bookingAPI,
        {
          roomName: roomName,
          bookingDate: updateBooking.bookingDate,
          startTime: updateBooking.startTime,
          endTime: updateBooking.endTime,
        },
        {
          headers: {
            Pragma: sessionStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        props.onHide();
      })
      .catch((err) => {
        // console.log("error happend");
        console.log(err.response.data);
      });
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Booking
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} className="room-section">
          <legend className="p-2 ">Booking Date</legend>
          <br />
          <FormControl
            value={updateBooking.bookingDate}
            onChange={(e) =>
              setUpdateBooking({
                ...updateBooking,
                bookingDate: e.target.value,
              })
            }
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
              value={updateBooking.startTime}
              onChange={(e) =>
                setUpdateBooking({
                  ...updateBooking,
                  startTime: e.target.value,
                })
              }
            />
          </fieldset>
          <br />
          <fieldset>
            <legend className="p-2 "> End Time</legend>
            <FormControl
              className="p-2 "
              type="time"
              value={updateBooking.endTime}
              onChange={(e) =>
                setUpdateBooking({ ...updateBooking, endTime: e.target.value })
              }
            />
          </fieldset>

          <br />
          <FormControl type="submit" />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <div className="modal-footer">
          <Button onClick={handleDeleteBooking}>Delete Booking</Button>
          <Button onClick={props.onHide}>Close</Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default EditScheduler;
