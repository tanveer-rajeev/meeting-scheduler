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
      sessionStorage.setItem("token", jwtToken);
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
      // let errorMessage = signUpErrorNotification(err);
      // console.log(errorMessage);
      return err.response.data.message;
    });
};

// const signUpErrorNotification = (error) => {
//   const errResponse = error.response.data.message;
//   const firstChar = errResponse.charAt(0);

//   switch (firstChar) {
//     case "-":
//       return "User  name already exist \nTry another name";

//     case "~":
//       return "User name should be at least 3 characters";

//     case ">":
//       return "Password should be 6 characters and contains with any symbol";

//     default:
//       return "username and password can not be empty";
//   }
// };
