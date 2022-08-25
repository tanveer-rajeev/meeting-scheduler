import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, Grid } from "@mui/material";
import React from "react";
import axios from "../Server_API/axios";
import TextField from "@mui/material/TextField";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import moment from "moment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

export default function EditRoom({ room, showModal, onHide }) {
  let { id, roomName, capacity, startTime, endTime } = room;
  const [editRoom, setEditRoom] = React.useState({
    roomName: "",
    capacity: "",
    startTime: null,
    endTime: null,
  });

  const handleClose = () => {
    onHide();
  };

  const handleSubmit = () => {
    startTime = moment(editRoom.startTime).format("HH:MM");
    endTime = moment(editRoom.endTime).format("HH:MM");
    console.log("Room End time: " + endTime);
    axios
      .put(`http://localhost:8080/rooms/update/${id}`, {
        roomName: editRoom.roomName,
        capacity: editRoom.capacity,
        startTime: startTime,
        endTime: endTime,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
    handleClose();
  };

  return (
    <div>
      <Dialog open={showModal} onClose={handleClose}>
        <DialogTitle>Add New Room</DialogTitle>
        <DialogContent>
          <Grid container rowSpacing={2}>
            <Grid item xs={12} sm={9}>
              <TextField
                required
                id="roomName"
                name="roomName"
                label="roomName"
                fullWidth
                autoComplete="roomName"
                variant="standard"
                value={roomName}
                onChange={(newValue) =>
                  setEditRoom((prev) => ({
                    ...prev,
                    roomName: newValue.target.value,
                  }))
                }
              />
            </Grid>
            <Grid item xs={12} sm={9}>
              <TextField
                required
                id="capacity"
                name="capacity"
                label="capacity"
                fullWidth
                autoComplete="capacity"
                variant="standard"
                value={capacity}
                onChange={(newValue) =>
                  setEditRoom((prev) => ({
                    ...prev,
                    capacity: newValue.target.value,
                  }))
                }
              />
            </Grid>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <Grid item xs={12} sm={9}>
                <TimePicker
                  label="Start Time"
                  value={editRoom.startTime}
                  onChange={(newValue) =>
                    setEditRoom((prev) => ({ ...prev, startTime: newValue }))
                  }
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
              <Grid item xs={12} sm={9}>
                <TimePicker
                  label="End Time"
                  value={editRoom.endTime}
                  onChange={(newValue) =>
                    setEditRoom((prev) => ({ ...prev, endTime: newValue }))
                  }
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
            </LocalizationProvider>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Edit Room</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
