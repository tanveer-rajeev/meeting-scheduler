import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import BookedUserInfo from "./BookedUserInfo";
import { Typography } from "@mui/material";
import { Grid, Paper } from "@mui/material";

function RoomCard({ room }) {
  const { roomName, capacity, startTime, endTime, booking } = room;

  return (
    <Grid item xs={12}>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          {roomName}
        </Typography>
        <Table title={roomName} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Start Time</TableCell>
              <TableCell>End Time</TableCell>
              <TableCell>Booking Date</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>PhoneNumber</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {booking?.map((booking) => (
              <BookedUserInfo {...booking} key={booking.id} />
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Grid>
  );
}

export default RoomCard;
