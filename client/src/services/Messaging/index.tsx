import { io } from "socket.io-client";
import { BASE_URL } from "../Common";

const socket = io(BASE_URL, {
  autoConnect: false,
});

export const connect = () => {
  try {
    socket.connect();
  } catch (err) {
    console.log(err);
  }
};

export const disconnect = () => {
  try {
    socket.disconnect();
  } catch (err) {
    console.log(err);
  }
};

export const onStartSession = (data: any) => {
  try {
    socket.emit("createLecture", data);
  } catch (err) {
    console.log(err);
  }
};

export const onJoinLecture = (data: any) => {
  try {
    socket.emit("joinLecture", data);
  } catch (err) {
    console.log(err);
  }
};
