import React, { useState } from "react";
import Table from "@mui/material/Table";
import { isUser } from "../Utilities/LoggedInUserInfo";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import BookedUserInfo from "./BookedUserInfo";
import { Box, styled, Typography } from "@mui/material";
import { Grid, Paper } from "@mui/material";
import { IconButton } from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import EditRoom from "./EditRoom";
import axios from "axios";
import { TimeConverter } from "../Utilities/TimeConverter";

function RoomCard({ room, handleRendering }) {
  const { id, roomName, startTime, endTime, booking } = room;
  const [isShown, setIsShown] = useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const startTimeInt = parseInt(startTime.substr(0, 2));
  const endTimeInt = parseInt(endTime.substr(0, 2));

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
  const handleModalClose = () => {
    setModalOpen(false);
    handleRendering();
  };

  const handleDelete = () => {
    console.log(roomName);
    axios
      .delete(`http://localhost:8080/rooms/${id}`, {
        headers: {
          pragma: sessionStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
    handleRendering();
  };

  return (
    <Grid
      onMouseEnter={() => {
        if (isUser()) setIsShown(true);
      }}
      onMouseLeave={() => setIsShown(false)}
      item
      xs={12}
    >
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Typography
              component="h2"
              variant="h6"
              color="black"
              gutterBottom
              sx={{
                display: "flex",
                justifyContent: "right",
                mb: 2,
              }}
            >
              {roomName}
            </Typography>
          </Box>
          <Box>
            {isShown && (
              <>
                <IconButton onClick={() => setModalOpen(true)}>
                  <BorderColorIcon />
                </IconButton>

                <IconButton onClick={handleDelete}>
                  <DeleteIcon />
                </IconButton>
              </>
            )}
          </Box>
        </Box>

        <Table size="small" aria-label="caption table">
          <caption color="SlateGray">
            <Typography
              component="h2"
              variant="h6"
              color="SlateGray"
              gutterBottom
              sx={{
                fontSize: 15,
                display: "flex",
                justifyContent: "right",
                mb: 1,
              }}
            >
              The room is available from{" "}
              {TimeConverter(startTimeInt, startTime)} am to{" "}
              {TimeConverter(endTimeInt, endTime)}
            </Typography>
          </caption>
          <TableHead>
            <TableRow>
              <StyledTableCell>Start Time</StyledTableCell>
              <StyledTableCell>End Time</StyledTableCell>
              <StyledTableCell>Booking Date</StyledTableCell>
              <StyledTableCell>Username</StyledTableCell>
              <StyledTableCell>Department</StyledTableCell>
              <StyledTableCell>PhoneNumber</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {booking?.map((booking) => (
              <BookedUserInfo {...booking} key={booking.id} />
            ))}
          </TableBody>
        </Table>
      </Paper>
      {isUser() && modalOpen && (
        <EditRoom room={room} showModal={modalOpen} onHide={handleModalClose} />
      )}
    </Grid>
  );
}

export default RoomCard;
