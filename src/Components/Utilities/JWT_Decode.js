import jwt_decode from "jwt-decode";

const token = sessionStorage.getItem("token");
export const JWT_Decode = () => {
  if (token == null) return null;
  const decode = jwt_decode(token);
  return decode.sub;
};

export const Role = () => {
  return jwt_decode(token).authorities[2].authority;
};

export const isUser = () => {
  return true ? Role() === "ROLE_USER" : false;
};
