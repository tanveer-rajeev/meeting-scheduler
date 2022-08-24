import React, { useEffect, useState } from "react";
import axios from "axios";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { TimeConverter } from "../Utilities/TimeConverter";

function BookedUserInfo({ id, startTime, endTime, bookingDate }) {
  const [bookedUsersInfo, setBookedUsersInfo] = useState([]);

  const startTimeInt = parseInt(startTime.substr(0, 2));
  const endTimeInt = parseInt(endTime.substr(0, 2));

  useEffect(() => {
    axios
      .get(`http://localhost:8080/booking/user/bookingId/${id}`, {
        headers: {
          pragma: sessionStorage.getItem("token"),
        },
      })
      .then((response) => {
        setBookedUsersInfo(response.data);
      });
  }, [id]);

  const handleEditBooking = () => {};
  return (
    <TableRow>
      <TableCell>{TimeConverter(startTimeInt, startTime)}</TableCell>
      <TableCell>{TimeConverter(endTimeInt, endTime)}</TableCell>
      <TableCell>{bookingDate}</TableCell>
      <TableCell>{bookedUsersInfo.username}</TableCell>
      <TableCell>{bookedUsersInfo.department}</TableCell>
      <TableCell>{bookedUsersInfo.phoneNumber}</TableCell>
    </TableRow>
  );
}

export default BookedUserInfo;
