import * as React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import API from "../Server_API/API";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export default function AddRoom() {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const [newRoom, setNewRoom] = React.useState({
    roomName: "",
    capacity: "",
    startTime: null,
    endTime: null,
  });
  const handleClose = () => {
    setOpen((prev) => !prev);
    navigate("/ongoingScheduled");
  };
  const handleSubmit = () => {
    let { startTime, endTime } = newRoom;
    startTime = moment(startTime).format("HH:MM");
    endTime = moment(endTime).format("HH:MM");
    axios
      .post(
        API.post.createRoom,
        {
          roomName: newRoom.roomName,
          capacity: newRoom.capacity,
          startTime: startTime,
          endTime: endTime,
        },
        {
          headers: {
            pragma: localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });

    handleClose();
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Room</DialogTitle>
        <DialogContent>
          <Grid container rowSpacing={2}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <Grid item xs={12} sm={9}>
                <TextField
                  required
                  id="roomName"
                  name="roomName"
                  label="Room Name"
                  fullWidth
                  autoComplete="Room Name"
                  variant="standard"
                  value={newRoom.roomName}
                  onChange={(event) => {
                    setNewRoom((prev) => ({
                      ...prev,
                      roomName: event.target.value,
                    }));
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={9}>
                <TextField
                  // required
                  id="capacity"
                  name="capacity"
                  label="Room Capacity"
                  fullWidth
                  autoComplete="Room Capacity"
                  variant="standard"
                  value={newRoom.capacity}
                  onChange={(event) => {
                    setNewRoom((prev) => ({
                      ...prev,
                      capacity: event.target.value,
                    }));
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={9}>
                <TimePicker
                  label="Start Time"
                  value={newRoom.startTime}
                  onChange={(newValue) =>
                    setNewRoom((prev) => ({ ...prev, startTime: newValue }))
                  }
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
              <Grid item xs={12} sm={9}>
                <TimePicker
                  label="End Time"
                  value={newRoom.endTime}
                  onChange={(newValue) =>
                    setNewRoom((prev) => ({ ...prev, endTime: newValue }))
                  }
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
            </LocalizationProvider>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Create Room</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
