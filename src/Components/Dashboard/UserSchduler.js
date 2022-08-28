import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { IconButton, Typography } from "@mui/material";
import { TimeConverter } from "../Utilities/TimeConverter";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import EditBooking from "./EditBooking";
export default function UserSchduler({ displayBookings, handleRendering }) {
  const [editModal, setEditModal] = useState(false);

  const handleEditBooking = () => {
    setEditModal(false);
    handleRendering();
  };

  const handleDeleteBooking = (id) => {
    axios
      .delete(`http://localhost:8080/booking/${id}`, {
        headers: {
          pragma: localStorage.getItem("token"),
        },
      })
      .then((response) => console.log(response))
      .catch((err) => console.log(err.response.data.message));
    handleRendering();
    // setRender((prev) => !prev);
  };
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Schedules
      </Typography>
      {displayBookings.length > 0 ? (
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
            {displayBookings?.map((data) => (
              <TableRow key={data.booking.id}>
                <TableCell>{data.roomName}</TableCell>
                <TableCell>
                  {TimeConverter(
                    parseInt(data.booking.startTime.substr(0, 2)),
                    data.booking.startTime
                  )}
                </TableCell>
                <TableCell>
                  {TimeConverter(
                    parseInt(data.booking.endTime.substr(0, 2)),
                    data.booking.endTime
                  )}
                </TableCell>
                <TableCell>{data.booking.bookingDate}</TableCell>
                <TableCell>
                  <IconButton onClick={() => setEditModal(true)}>
                    <BorderColorIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleDeleteBooking(data.booking.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
                {editModal && (
                  <EditBooking
                    key={data.booking.id}
                    booking={data.booking}
                    showModal={editModal}
                    onHideModal={handleEditBooking}
                  />
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Typography>You have no booking yet</Typography>
      )}
    </>
  );
}
