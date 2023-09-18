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
  Initialize = "initialize",
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
