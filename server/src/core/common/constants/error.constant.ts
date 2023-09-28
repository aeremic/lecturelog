export class ErrorConstants {
    public static GetMethodError: number = 0;
    public static PostMethodError: number = 1;
    public static DeleteMethodError: number = 2;
    public static MessagingGetawayError: number = 3;
}

export class ErrorMessageConstants {
    public static UserExists: string = "User already exists";
    public static UserDoesntExists: string = "User doesn't exists";
}

export class CsvParseErrorConstants {
    public static UnsuccessfullUpload = "Upload was not successfull.";
    public static DataNotValid = "Data not valid";
    public static HeaderNotValid = "Header not valid";
    public static IdentifierUndefined = "Identifier cannot be undefined";
    public static UserNotCreated = "User not uploaded";
    public static UserNotUpdated = "User not changed on upload"
}