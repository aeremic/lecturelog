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
  CreateLecture = "createLecture",
  EndLecture = "endLecture",
  JoinLecture = "joinLecture",
  StartTimer = "startTimer",
  GenerateCode = "generateCode",
}
