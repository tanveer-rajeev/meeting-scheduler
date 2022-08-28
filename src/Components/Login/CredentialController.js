import axios from "axios";

export const logInWithCredentials = ({ username, password }) => {
  const loginAPI = `http://localhost:8080/login`;

  return axios
    .post(loginAPI, {
      username: username,
      password: password,
    })
    .then((response) => {
      const { headers } = response;
      const jwtToken = headers.pragma;
      localStorage.setItem("test", "test");
      localStorage.setItem("token", jwtToken);
    })
    .catch((error) => {
      return error.response.status;
    });
};

export const signUPWithCredentials = ({
  username,
  password,
  phoneNumber,
  department,
}) => {
  const signUpAPI = `http://localhost:8080/users`;

  return axios
    .post(signUpAPI, {
      username: username,
      password: password,
      phoneNumber: phoneNumber,
      department: department,
    })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((err) => {
      return err.response.data.message;
    });
};
