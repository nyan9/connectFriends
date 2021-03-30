import axios from "axios";

export const getChats = () => {
  return axios.get("/api/chat/getChats");
};