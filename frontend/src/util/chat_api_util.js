import axios from "axios";

export const getChats = () => {
  return axios.get("/api/chat/getChats");
};

export const resetChats = () => {
  return axios.delete("/api/chat/resetChats")
} 