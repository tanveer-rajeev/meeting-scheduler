import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import BookedUserInfo from "./BookedUserInfo";
import { Typography } from "@mui/material";

function RoomCard({ room }) {
  const { roomName, capacity, startTime, endTime, booking } = room;

  return (
    <div>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        {roomName}
      </Typography>
      <Table title={roomName}>
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
          {booking?.map((booking) => (
            <BookedUserInfo {...booking} key={booking.id} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default RoomCard;
