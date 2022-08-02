import React, { useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import "./RoomCard.css";
import BookedInfo from "./BookedInfo";
import Room from "./Room";
import { DeleteBooking } from "../Booking/AddBooking";

const RoomCard = ({ room }) => {
  const { id, roomName, capacity, startTime, endTime, booking } = room;
  const [modalShow, setModalShow] = useState(false);
  const [deleteRoom, setDeleteRoom] = useState(false);

  const openModal = () => {
    setModalShow(true);
  };
  const closeModal = () => {
    setModalShow(false);
  };

  return (
    <div className="col-md-5 mt-2">
      <Card className="w-100">
        <Card.Body>
          <Card.Title>{roomName}</Card.Title>
          <Card.Text>This room for {capacity} person.</Card.Text>
          <Card.Text>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>User</th>
                  <th>Department</th>
                  <th>Contact No.</th>
                  <th>Booking Date</th>
                </tr>
              </thead>
              <tbody>
                {booking.map((booking) => (
                  <BookedInfo {...booking} key={booking.id} />
                ))}
              </tbody>
            </Table>
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted  p-5">
            Room available for booking {startTime} am to {endTime} pm{" "}
          </small>

          <Button onClick={openModal}>Booking</Button>
          {modalShow && (
            <Room openModal={openModal} closeModal={closeModal} id={id} />
          )}
        </Card.Footer>
      </Card>
    </div>
  );
};

export default RoomCard;
