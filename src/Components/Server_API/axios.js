import axios from "axios";

export default axios.create({
  baseUrl: "http://localhost:8080",
  headers: {
    Pragma: sessionStorage.getItem("token"),
  },
});
