import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { TimeConverter } from "../Utilities/TimeConverter";
import { IconButton } from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
const DisplayUserSchdulers = ({ bookingResponse }) => {
  const { roomName, booking } = bookingResponse;
  const { startTime, endTime, bookingDate } = booking;
  const startTimeInt = parseInt(startTime.substr(0, 2));
  const endTimeInt = parseInt(endTime.substr(0, 2));

  const handleEditBooking = () => {};
  return (
    <TableRow>
      <TableCell>{roomName}</TableCell>
      <TableCell>{TimeConverter(startTimeInt, startTime)}</TableCell>
      <TableCell>{TimeConverter(endTimeInt, endTime)}</TableCell>
      <TableCell>{bookingDate}</TableCell>
      <TableCell>
        <IconButton onClick={handleEditBooking}>
          <BorderColorIcon />
        </IconButton>
      </TableCell>
      <TableCell>
        <IconButton onClick={handleEditBooking}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default DisplayUserSchdulers;
