import jwt_decode from "jwt-decode";
export const JWT_Decode = () => {
  const token = sessionStorage.getItem("token");
  if (token == null) return null;
  const decode = jwt_decode(token);
  return decode.sub;
};
