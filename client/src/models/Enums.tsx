export enum RoleEnum {
  Default = "",
  Professor = "professor",
  Student = "student",
  Admin = "admin",
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
  JoinLecture = "joinLecture",
  StartLectureWork = "startLectureWork",
  CancelLectureWork = "cancelLectureWork",
  GenerateCode = "generateCode",
}

export enum MessagingEvent {
  LectureTimerEvent = "lectureTimerEvent",
  LectureCodeEvent = "lectureCodeEvent",
  LecturesChange = "lecturesChange",
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
