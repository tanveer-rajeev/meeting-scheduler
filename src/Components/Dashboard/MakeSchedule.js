import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Button, InputLabel, MenuItem, Paper, Select } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers";
import axios from "axios";
import { JWT_Decode } from "../Utilities/LoggedInUserInfo";
import moment from "moment";
import API from "../Server_API/API";
import { TimeConverter } from "../Utilities/TimeConverter";
// const [enable, setEnable] = React.useState(true);
// if (
//   schedule.room !== "" &&
//   schedule.startTime !== null &&
//   schedule.endTime !== null &&
//   schedule.date !== new Date()
// ) {
//   console.log("button enable");
//   setEnable((prev) => ({ ...prev, enabled: false }));
// }

export default function MakeSchedule() {
  const [schedule, setSchedule] = React.useState({
    name: "",
    room: "",
    dept: "",
    startTime: null,
    endTime: null,
    date: new Date(),
  });

  const [rooms, setRooms] = React.useState([]);
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

  const handleSubmit = (event) => {
    let { name, room, date, startTime, endTime } = schedule;

    startTime = moment(startTime).format("HH:MM");
    date = moment(date).format("YYYY-MM-DD");
    endTime = moment(endTime).format("HH:MM");
    name = JWT_Decode();

    const bookingApi = `http://localhost:8080/booking/userName/${name}/roomName/${room}`;
    const post = {
      bookingDate: date,
      startTime: startTime,
      endTime: endTime,
    };

    event.preventDefault();
    axios
      .post(bookingApi, post, {
        headers: {
          Pragma: sessionStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Add Schedule
      </Typography>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "row",
          height: 250,
          justifyContent: "center",
        }}
      >
        <Grid container rowSpacing={2}>
          <Grid item xs={12} sm={9}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First name"
              fullWidth
              autoComplete="given-name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={9}>
            <InputLabel id="room">Meeting Room</InputLabel>
            <Select
              required
              name="room"
              label="Meeting room"
              fullWidth
              variant="standard"
              value={schedule.room}
              onChange={(event) =>
                setSchedule((prev) => ({ ...prev, room: event.target.value }))
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
          <Grid item xs={12} sm={9}>
            <TextField
              required
              id="department"
              name="department"
              label="Department"
              fullWidth
              autoComplete="Department"
              variant="standard"
            />
          </Grid>
        </Grid>

        <Grid container rowSpacing={2}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <Grid item xs={12} sm={9}>
              <TimePicker
                label="Start Time"
                value={schedule.startTime}
                onChange={(newValue) =>
                  setSchedule((prev) => ({ ...prev, startTime: newValue }))
                }
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
            <Grid item xs={12} sm={9}>
              <TimePicker
                label="End Time"
                value={schedule.endTime}
                onChange={(newValue) =>
                  setSchedule((prev) => ({ ...prev, endTime: newValue }))
                }
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
            <Grid item xs={12} sm={9}>
              <DatePicker
                views={["day"]}
                label="Date"
                value={schedule.date}
                onChange={(newValue) =>
                  setSchedule((prev) => ({ ...prev, date: newValue }))
                }
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
          </LocalizationProvider>
        </Grid>

        <Button
          onClick={handleSubmit}
          variant="outlined"
          size="large"
          disabled={false}
        >
          Add
        </Button>
      </Paper>
    </>
  );
}
