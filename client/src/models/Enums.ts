export enum RoleEnum {
  Default = "",
  Professor = "professor",
  Student = "student",
  Admin = "admin",
  Invalid = "invalid",
}

export enum CodeGenerationState {
  notGenerated,
  generated,
  canceled,
}

export enum MessagingEnum {
  JoinActiveLectures = "joinActiveLectures",
  JoinActiveLecture = "joinActiveLecture",
  CreateLecture = "createLecture",
  EndLecture = "endLecture",
  EndLectures = "endLectures",
  StartLectureWork = "startLectureWork",
  CancelLectureWork = "cancelLectureWork",
  GenerateCode = "generateCode",
  AttendActiveLecture = "attendActiveLecture",
}

export enum MessagingEvent {
  LectureTimerEvent = "lectureTimerEvent",
  LectureCodeEvent = "lectureCodeEvent",
  LecturesChange = "lecturesChange",
  LectureAttendeesChange = "lectureAttendeesChange",
}

export enum LectureTimerEventType {
  Tick = "tick",
  Stop = "stop",
}

export enum UploadUsersResult {
  successfull = 1,
  unsucessfull = 2,
  notFullyCompleted = 3,
}

export enum SubjectManipulationType {
  creating,
  updating,
}
