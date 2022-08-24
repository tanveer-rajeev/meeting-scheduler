const API = {};

API.get = {
  getAllRooms: `http://localhost:8080/rooms`,
};

API.post = {
  createRoom: `http://localhost:8080/rooms`,
};

API.put = {
  updateUserProfile: `http://localhost:8080/users`,
  updateRoom: `http://localhost:8080/rooms`,
};

export default API;
