import { io } from "socket.io-client";
import { BASE_URL } from "../Common";
import { MessagingEnum } from "../../models/Enums";

export const socket = io(BASE_URL, {
  autoConnect: true,
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
    socket.emit(MessagingEnum.CreateLecture, data);
  } catch (err) {
    console.log(err);
  }
};

export const onStopSession = (data: any) => {
  try {
    socket.emit(MessagingEnum.EndLecture, data);
  } catch (err) {
    console.log(err);
  }
};

export const onJoinLecture = (data: any) => {
  try {
    socket.emit(MessagingEnum.JoinLecture, data);
  } catch (err) {
    console.log(err);
  }
};

export const onStartTimer = (data: any) => {
  try {
    socket.emit(MessagingEnum.StartTimer, data);
  } catch (err) {
    console.log(err);
  }
};

export const onGenerateCode = (data: any) => {
  try {
    socket.emit(MessagingEnum.GenerateCode, data);
  } catch (err) {
    console.log(err);
  }
};
