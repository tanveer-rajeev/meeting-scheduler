import React, { useState } from "react";
import Table from "@mui/material/Table";
import { isUser } from "../Utilities/LoggedInUserInfo";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import BookedUserInfo from "./BookedUserInfo";
import { Box, Typography } from "@mui/material";
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

  const handleModalClose = () => {
    setModalOpen(false);
    handleRendering();
  };

  const handleDelete = () => {
    console.log(roomName);
    axios
      .delete(`http://localhost:8080/rooms/${id}`, {
        headers: {
          pragma: localStorage.getItem("token"),
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
              color="primary"
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

        <Table size="small">
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
        <Typography
          component="h2"
          variant="h6"
          color="green"
          gutterBottom
          sx={{
            paddingTop: 2,
            fontSize: 13,
            display: "flex",
            justifyContent: "right",
            mb: 2,
          }}
        >
          , Room available {TimeConverter(startTimeInt, startTime)} am to{" "}
          {TimeConverter(endTimeInt, endTime)} pm{" "}
        </Typography>
      </Paper>
      {isUser() && modalOpen && (
        <EditRoom room={room} showModal={modalOpen} onHide={handleModalClose} />
      )}
    </Grid>
  );
}

export default RoomCard;
