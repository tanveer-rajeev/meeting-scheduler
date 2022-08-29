import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { styled } from "@mui/material/styles";
import { IconButton, Paper, TableContainer, Typography } from "@mui/material";
import { TimeConverter } from "../Utilities/TimeConverter";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import EditBooking from "./EditBooking";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

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
          pragma: sessionStorage.getItem("token"),
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
        <TableContainer component={Paper}>
          <Table size="small" sx={{ minWidth: 700 }} aria-label="caption table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Room</StyledTableCell>
                <StyledTableCell>Start Time</StyledTableCell>
                <StyledTableCell>End Time</StyledTableCell>
                <StyledTableCell>Booking Date</StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {displayBookings?.map((data) => (
                <StyledTableRow key={data.booking.id}>
                  <StyledTableCell>{data.roomName}</StyledTableCell>
                  <StyledTableCell>
                    {TimeConverter(
                      parseInt(data.booking.startTime.substr(0, 2)),
                      data.booking.startTime
                    )}
                  </StyledTableCell>
                  <StyledTableCell>
                    {TimeConverter(
                      parseInt(data.booking.endTime.substr(0, 2)),
                      data.booking.endTime
                    )}
                  </StyledTableCell>
                  <StyledTableCell>{data.booking.bookingDate}</StyledTableCell>
                  <StyledTableCell>
                    <IconButton onClick={() => setEditModal(true)}>
                      <BorderColorIcon />
                    </IconButton>
                  </StyledTableCell>
                  <StyledTableCell>
                    <IconButton
                      onClick={() => handleDeleteBooking(data.booking.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </StyledTableCell>
                  {editModal && (
                    <EditBooking
                      key={data.booking.id}
                      booking={data.booking}
                      showModal={editModal}
                      onHideModal={handleEditBooking}
                    />
                  )}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography>You have no booking yet</Typography>
      )}
    </>
  );
}
