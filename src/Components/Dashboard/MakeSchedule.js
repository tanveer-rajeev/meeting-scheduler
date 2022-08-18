import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import AddCardIcon from "@mui/icons-material/AddCard";
import {
  Button,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker, DesktopDatePicker } from "@mui/x-date-pickers";
import AddBoxIcon from "@mui/icons-material/AddBox";
export default function MakeSchedule() {
  const [schedule, setSchedule] = React.useState({
    name: "",
    room: "",
    dept: "",
    startTime: null,
    endTime: null,
    date: new Date(),
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get);
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
        <Grid container xs={12} md={18} lg={9} rowSpacing={2}>
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
              autoComplete="family-name"
              variant="standard"
              value={schedule.room}
              onChange={(event) =>
                setSchedule({ ...schedule, room: event.target.value })
              }
            >
              <MenuItem value="Official"> Office </MenuItem>
              <MenuItem value="Interview"> Interview </MenuItem>
              <MenuItem value="Team"> Team </MenuItem>
              <MenuItem value="Client"> Client </MenuItem>
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

        <Grid container xs={12} md={8} lg={9} rowSpacing={2}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <Grid item xs={12} sm={9}>
              <TimePicker
                label="Start Time"
                value={schedule.startTime}
                onChange={(newValue) =>
                  setSchedule({ ...schedule, startTime: newValue })
                }
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
            <Grid item xs={12} sm={9}>
              <TimePicker
                label="End Time"
                value={schedule.endTime}
                onChange={(newValue) =>
                  setSchedule({ ...schedule, endTime: newValue })
                }
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
            <Grid item xs={12} sm={9}>
              <DatePicker
                views={["day"]}
                label="Date"
                value={schedule.date}
                onChange={(newValue) => {
                  setSchedule({ ...schedule, date: newValue });
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
          </LocalizationProvider>
        </Grid>

        <Button variant="outlined" size="large" disabled={false}>
          <AddBoxIcon />
        </Button>
      </Paper>
    </>
  );
}
