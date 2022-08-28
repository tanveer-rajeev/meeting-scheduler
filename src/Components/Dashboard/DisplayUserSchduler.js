import React, { useEffect, useState } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { TimeConverter } from "../Utilities/TimeConverter";
import { IconButton, Table } from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import EditBooking from "./EditBooking";
import axios from "axios";

const DisplayUserSchdulers = ({ bookingResponse, handleSetRender }) => {
  const { roomName, booking } = bookingResponse;
  const { id, startTime, endTime, bookingDate } = booking;
  const startTimeInt = parseInt(startTime.substr(0, 2));
  const endTimeInt = parseInt(endTime.substr(0, 2));
  const [editModal, setEditModal] = useState(false);

  const handleEditBooking = () => {
    setEditModal(false);
    handleSetRender();
  };

  const handleDeleteBooking = () => {
    axios
      .delete(`http://localhost:8080/booking/${id}`, {
        headers: {
          pragma: localStorage.getItem("token"),
        },
      })
      .then((response) => console.log(response))
      .catch((err) => console.log(err.response.data.message));
    handleSetRender();
    // setRender((prev) => !prev);
  };
  return (
    <TableRow>
      <TableCell>{roomName}</TableCell>
      <TableCell>{TimeConverter(startTimeInt, startTime)}</TableCell>
      <TableCell>{TimeConverter(endTimeInt, endTime)}</TableCell>
      <TableCell>{bookingDate}</TableCell>
      <TableCell>
        <IconButton onClick={() => setEditModal(true)}>
          <BorderColorIcon />
        </IconButton>
      </TableCell>
      <TableCell>
        <IconButton onClick={handleDeleteBooking}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
      {editModal && (
        <EditBooking
          booking={booking}
          showModal={editModal}
          onHideModal={handleEditBooking}
        />
      )}
    </TableRow>
  );
};

export default DisplayUserSchdulers;
