import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Box, InputLabel, MenuItem, Select } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker, DesktopDatePicker } from "@mui/x-date-pickers";

export default function MakeSchedule() {
  const [time, setTime] = React.useState({
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
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Add Schedule
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
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
          <Grid item xs={12} sm={6}>
            <InputLabel id="room">Meeting Room</InputLabel>
            <Select
              required
              id="room"
              name="room"
              label="Meeting room"
              fullWidth
              autoComplete="family-name"
              variant="standard"
            >
              <MenuItem> Office </MenuItem>
              <MenuItem> Interview </MenuItem>
              <MenuItem> Personal </MenuItem>
              <MenuItem> Buyer </MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12}>
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
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <Grid item xs={12}>
              <TimePicker
                label="Start Time"
                value={time.startTime}
                onChange={(newValue) =>
                  setTime({ ...time, startTime: newValue })
                }
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TimePicker
                label="End Time"
                value={time.endTime}
                onChange={(newValue) => setTime({ ...time, endTime: newValue })}
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                views={["day"]}
                label="Date"
                value={time.date}
                onChange={(newValue) => {
                  setTime({ ...time, date: newValue });
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
          </LocalizationProvider>
        </Grid>
      </Box>
    </React.Fragment>
  );
}
