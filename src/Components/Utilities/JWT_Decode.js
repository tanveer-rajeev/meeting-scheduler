import jwt_decode from "jwt-decode";

export const JWT_Decode = () => {
  const decode = jwt_decode(sessionStorage.getItem("token"));
  return decode.sub;
};

export const Role = () => {
  return jwt_decode(sessionStorage.getItem("token")).authorities[2].authority;
};

export const isUser = () => {
  return true ? Role() === "ROLE_USER" : false;
};
