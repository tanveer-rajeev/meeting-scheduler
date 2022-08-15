import React, { useState, useEffect, useContext } from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { UserContext } from "../../../App";
import axios from "axios";
import { Button } from "@mui/material";

export default function UserPanel() {
  const [bookings, setBookings] = useState([{}]);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  useEffect(() => {
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
  console.log(bookings[0].booking.startTime);
  const handleEditBooking = () => {};

  return (
    <React.Fragment>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Room</TableCell>
            <TableCell>Start Time</TableCell>
            <TableCell>End Time</TableCell>
            <TableCell>Booking Date</TableCell>
            <TableCell align="right">Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map((get) => (
            <TableRow key={get.id}>
              <TableCell>{get.roomName}</TableCell>
              <TableCell>{get.booking.startTime}</TableCell>
              <TableCell>{get.booking.endTime}</TableCell>
              <TableCell>{get.booking.bookingDate}</TableCell>
              <TableCell align="right">
                <Button small onClick={handleEditBooking}>
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
