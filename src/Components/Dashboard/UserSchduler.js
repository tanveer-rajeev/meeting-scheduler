import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import DisplayUserSchdulers from "./DisplayUserSchduler";
import { JWT_Decode } from "../Utilities/JWT_Decode";

export default function UserSchduler() {
  const [bookings, setBookings] = useState([]);
  console.log("UserSchduler");
  useEffect(() => {
    const username = JWT_Decode();
    axios
      .get(`http://localhost:8080/users/allBookings/${username}`, {
        headers: {
          Pragma: sessionStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setBookings(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Room</TableCell>
            <TableCell>Start Time</TableCell>
            <TableCell>End Time</TableCell>
            <TableCell>Booking Date</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings?.map((data) => (
            <DisplayUserSchdulers
              bookingResponse={data}
              key={data.booking.id}
            />
          ))}
        </TableBody>
      </Table>
    </>
  );
}
