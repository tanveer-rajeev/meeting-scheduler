import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import DisplayUserSchdulers from "./DisplayUserSchduler";
import { JWT_Decode } from "../Utilities/LoggedInUserInfo";
import { Typography } from "@mui/material";

export default function UserSchduler() {
  const [displayBookings, setDisplayBookings] = useState([]);
  const [render, setRender] = useState(0);

  const handleSetRender = () => {
    setRender((number) => number + 1);
  };

  useEffect(() => {
    const username = JWT_Decode();
    axios
      .get(`http://localhost:8080/api/users/allBookings/${username}`, {
        headers: {
          Pragma: sessionStorage.getItem("token"),
        },
      })
      .then((res) => {
        setDisplayBookings(res.data);
      })
      .catch((err) => console.log(err));
  }, [render]);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Schedules
      </Typography>
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
        {displayBookings && (
          <TableBody>
            {displayBookings?.map((data) => (
              <DisplayUserSchdulers
                bookingResponse={data}
                key={data.booking.id}
                handleSetRender={handleSetRender}
              />
            ))}
          </TableBody>
        )}
        {!displayBookings && (
          <TableRow>
            <TableCell>YOu have no booking yet</TableCell>
          </TableRow>
        )}
      </Table>
    </>
  );
}
