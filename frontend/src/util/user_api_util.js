import axios from "axios";

export const getUsers = () => {
  return axios.get("/api/users/getUsers");
};

export const getCurrentUser = (username) => {
  return axios.get(`/api/users/getUser/${username}`);
};

export const updateUser = (username, rating) => {
  return axios
    .post("/api/users/update", {
      username: username,
      elo: rating,
      _method: "patch",
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const deleteUser = (username) => {
  return axios.delete(`/api/users/deleteUser/${username}`);
};
