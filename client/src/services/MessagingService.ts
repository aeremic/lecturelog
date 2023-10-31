import { io } from "socket.io-client";
import { BASE_URL } from "./Common";
import { MessagingEnum } from "../models/Enums";
import { ISessionMetadata } from "../models/ISessionMetadata";
import { IAttendSessionMetadata } from "../models/IAttendSessionMetadata";

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

export const joinActiveSessions = (subjects: ISessionMetadata[]) => {
  try {
    socket.emit(MessagingEnum.JoinActiveLectures, JSON.stringify(subjects));
  } catch (err) {
    console.log(err);
  }
};

export const joinActiveSession = (data: ISessionMetadata) => {
  try {
    socket.emit(MessagingEnum.JoinActiveLecture, JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }
};

export const onStartSession = (data: ISessionMetadata) => {
  try {
    socket.emit(MessagingEnum.CreateLecture, JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }
};

export const onStopSession = (data: ISessionMetadata) => {
  try {
    socket.emit(MessagingEnum.EndLecture, JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }
};

export const onSaveSession = (data: ISessionMetadata) => {
  try {
    socket.emit(MessagingEnum.SaveLectureWork, JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }
};

export const onStopAllSessions = (data: ISessionMetadata[]) => {
  try {
    socket.emit(MessagingEnum.EndLectures, JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }
};

export const onStartLectureWork = (data: ISessionMetadata) => {
  try {
    socket.emit(MessagingEnum.StartLectureWork, JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }
};

export const onCancelLectureWork = (data: ISessionMetadata) => {
  try {
    socket.emit(MessagingEnum.CancelLectureWork, JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }
};

export const onAttendLecture = (data: IAttendSessionMetadata) => {
  try {
    socket.emit(MessagingEnum.AttendActiveLecture, JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }
};
