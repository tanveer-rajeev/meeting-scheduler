let token = sessionStorage.getItem("token");

// TODO: At the very First time log in problem
export function JWT_Decode() {
  const decode = parseJwt(token);
  return decode.sub;
}
const parseJwt = (token) => {
  try {
    return JSON.parse(window.atob(token?.split(".")[1]));
  } catch (e) {
    return null;
  }
};

const Role = () => {
  return parseJwt(token)?.authorities[2];
};

export function isUser() {
  return true ? Role() === "ROLE_USER" : false;
}
