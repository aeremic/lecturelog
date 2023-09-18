import { io } from "socket.io-client";
import { BASE_URL } from "../Common";
import { MessagingEnum } from "../../models/Enums";
import { ISessionData } from "../../modelHelpers/SessionData";

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

export const onStartSession = (data: ISessionData) => {
  try {
    socket.emit(MessagingEnum.CreateLecture, JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }
};

export const onStopSession = (data: ISessionData) => {
  try {
    socket.emit(MessagingEnum.EndLecture, JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }
};

export const onJoinLecture = (data: ISessionData) => {
  try {
    socket.emit(MessagingEnum.JoinLecture, JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }
};

export const onStartLectureWork = (data: ISessionData) => {
  try {
    socket.emit(MessagingEnum.StartLectureWork, JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }
};

export const onCancelLectureWork = (data: ISessionData) => {
  try {
    socket.emit(MessagingEnum.CancelLectureWork, JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }
};
