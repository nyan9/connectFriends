import axios from "axios";

export const getUsers = () => {
  return axios.get("/api/users/getUsers");
}

export const getCurrentUser = (username) => {
  return axios.get(`/api/users/getUser/${username}`)
}

export const updateUser = (username, rating) => {
  debugger
  return  axios.post('/api/users/update',
         {username: username,
           elo: rating,
         _method: 'patch'                  
    })
    .then(function (response) {
         console.log(response);
    })
    .catch(function (error) {
         console.log(error);            
    });
}