import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import Sidebar from "../Sidebar/Sidebar";
import SchedulerList from "./SchedulerList";
import { UserContext } from "../../App";

const UserScheduler = () => {
  const [bookings, setBookings] = useState([]);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  useEffect(() => {
    console.log(loggedInUser);
    const username = JSON.stringify(loggedInUser.name);
    let name = username.slice(1, username.length - 1);
    axios
      .get(`http://localhost:8080/users/allBookings/${name}`, {
        headers: {
          Pragma: sessionStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setBookings(res.data);
      })
      .catch((err) => console.log(err));
  }, [loggedInUser]);

  return (
    <>
      <Row>
        <Col md={3}>
          <Sidebar />
        </Col>
        <Col className="pt-9" md={9}>
          <Table striped bordered hover className={"w-50"}>
            <thead>
              <tr>
                <th>Room</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Booking Date</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {bookings?.map((booking) => (
                <SchedulerList bookingResponse={booking} key={booking.id} />
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  );
};

export default UserScheduler;
