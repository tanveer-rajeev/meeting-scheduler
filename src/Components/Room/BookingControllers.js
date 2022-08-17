import axios from "axios";
import { useState } from "react";

const token = sessionStorage.getItem("token");
const header = {
  pragma: token,
};

export const AddBooking = (id, { bookingDate, startTime, endTime }, name) => {
  // const [errorMessage, setErrorMessage] = useState("");
  const userName = name.slice(1, name.length - 1);

  // const handleError = (err) => {
  //   setErrorMessage(err.response.data);
  // };

  console.log(userName);
  const bookingAPI = `http://localhost:8080/booking/userName/${userName}/roomId/${id}`;
  axios.post(
    bookingAPI,
    {
      bookingDate: bookingDate,
      startTime: startTime,
      endTime: endTime,
    },
    {
      headers: header,
    }
  );
  // .catch((err) => {
  //   return <div>{errorMessage && <p>{errorMessage}</p>} </div>;
  // });
};

export const DeleteBooking = (id) => {
  console.log(id);
  const deleteApi = `http://localhost:8080/booking/${id}`;
  axios
    .delete(deleteApi, {
      headers: header,
    })
    .then((response) => {
      console.log("delete booking confirm");
    })
    .catch((err) => {
      console.log(err.response.data.message);
    });
};
