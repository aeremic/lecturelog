import { io } from "socket.io-client";
import { BASE_URL } from "../Common";
import { MessagingEnum } from "../../modelHelpers/Enums";
import { ISessionData } from "../../modelHelpers/SessionData";

export const socket = io(BASE_URL, {
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

export const listening = (event: string, callback: any) => {
  try {
    socket.on(event, callback);
  } catch (err) {
    console.log(err);
  }
};

export const dispose = (event: string, callback: any) => {
  try {
    socket.off(event, callback);
  } catch (err) {
    console.log(err);
  }
};

export const onInitActiveSessions = (activeGroups: any) => {
  try {
    socket.emit(
      MessagingEnum.InitializeActiveLectures,
      JSON.stringify(activeGroups)
    );
  } catch (err) {
    console.log(err);
  }
};

export const onInitActiveSession = (data: ISessionData) => {
  try {
    socket.emit(MessagingEnum.InitializeActiveLecture, JSON.stringify(data));
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
