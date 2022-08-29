import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import axios from "../Server_API/axios";
import TextField from "@mui/material/TextField";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import moment from "moment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers";
import API from "../Server_API/API";

export default function EditBooking({ booking, showModal, onHideModal }) {
  let { id, startTime, endTime, bookingDate } = booking;

  const [rooms, setRooms] = React.useState([]);
  const [editBooking, setEditBooking] = React.useState({
    roomName: "",
    bookingDate: null,
    startTime: null,
    endTime: null,
  });

  React.useEffect(() => {
    axios
      .get(API.get.getAllRooms, {
        headers: {
          Pragma: sessionStorage.getItem("token"),
        },
      })
      .then((response) => {
        setRooms(response.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, []);

  const handleClose = () => {
    onHideModal();
    window.location.reload();
  };

  const handleEdit = () => {
    startTime = moment(editBooking.startTime).format("HH:MM");
    bookingDate = moment(editBooking.bookingDate).format("YYYY-MM-DD");
    endTime = moment(editBooking.endTime).format("HH:MM");

    const update = {
      roomName: editBooking.roomName,
      bookingDate: bookingDate,
      startTime: startTime,
      endTime: endTime,
    };
    axios
      .put(`http://localhost:8080/booking/${id}`, update, {
        headers: {
          Pragma: sessionStorage.getItem("token"),
        },
      })
      .then((response) => {
        // console.log(response);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    handleClose();
  };

  return (
    <Dialog open={showModal} onClose={handleClose}>
      <DialogTitle>Edit</DialogTitle>
      <DialogContent>
        <Grid container rowSpacing={2}>
          <Grid item xs={12} sm={9}>
            <InputLabel id="room">Meeting Room</InputLabel>
            <Select
              required
              name="room"
              label="Meeting room"
              fullWidth
              variant="standard"
              value={editBooking.roomName}
              onChange={(event) =>
                setEditBooking((prev) => ({
                  ...prev,
                  roomName: event.target.value,
                }))
              }
            >
              {rooms &&
                rooms.map((room) => (
                  <MenuItem key={room.id} value={room.roomName}>
                    {room.roomName}
                  </MenuItem>
                ))}
            </Select>
          </Grid>

          <LocalizationProvider dateAdapter={AdapterMoment}>
            <Grid item xs={12} sm={9}>
              <TimePicker
                label="Start Time"
                value={editBooking.startTime}
                onChange={(newValue) =>
                  setEditBooking((prev) => ({ ...prev, startTime: newValue }))
                }
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
            <Grid item xs={12} sm={9}>
              <TimePicker
                label="End Time"
                value={editBooking.endTime}
                onChange={(newValue) =>
                  setEditBooking((prev) => ({ ...prev, endTime: newValue }))
                }
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
            <Grid item xs={12} sm={9}>
              <DatePicker
                views={["day"]}
                label="Date"
                value={editBooking.bookingDate}
                onChange={(newValue) =>
                  setEditBooking((prev) => ({ ...prev, bookingDate: newValue }))
                }
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
          </LocalizationProvider>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleEdit}>Edit Booking</Button>
      </DialogActions>
    </Dialog>
  );
}
