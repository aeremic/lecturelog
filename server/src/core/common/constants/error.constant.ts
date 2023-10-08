export class ErrorConstants {
  public static GetMethodError = 0;
  public static PostMethodError = 1;
  public static DeleteMethodError = 2;
  public static MessagingGetawayError = 3;
}

export class ErrorMessageConstants {
  public static UserExists = 'User already exists';
  public static UserDoesntExists = "User doesn't exists";
  public static EmailNotValid = 'Email is not valid';
  public static PropertiesNotValid = 'Invalid user data';
}

export class CsvParseErrorConstants {
  public static UnsuccessfullUpload = 'Upload was not successfull.';
  public static DataNotValid = 'Data not valid';
  public static HeaderNotValid = 'Header not valid';
}

export class CsvParseUserErrorConstants {
  public static IdentifierNotValid = 'User identifier is not valid';
  public static UserNotCreated = 'User not uploaded';
  public static UserNotUpdated = 'User not changed on upload';
  public static UserDataNotValid = 'User data not valid';
}
