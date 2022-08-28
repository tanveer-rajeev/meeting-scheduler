import axios from "axios";

export const AddBooking = (id, { bookingDate, startTime, endTime }, name) => {
  const userName = name.slice(1, name.length - 1);

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
      headers: {
        pragma: localStorage.getItem("token"),
      },
    }
  );
};

export const DeleteBooking = (id) => {
  console.log(id);
  const deleteApi = `http://localhost:8080/booking/${id}`;
  axios
    .delete(deleteApi, {
      headers: {
        pragma: localStorage.getItem("token"),
      },
    })
    .then((response) => {
      console.log("delete booking confirm");
    })
    .catch((err) => {
      console.log(err.response.data.message);
    });
};
