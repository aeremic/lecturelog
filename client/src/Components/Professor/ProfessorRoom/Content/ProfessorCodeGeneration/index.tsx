import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import PinIcon from "@mui/icons-material/Pin";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { CodeGenerationState } from "../../../../../models/Enums";
import {
  dispose,
  listening,
  onCancelLectureWork,
  joinActiveSession,
  onStartLectureWork,
} from "../../../../../services/MessagingService";
import { useSearchParams } from "react-router-dom";
import { HttpStatusCode } from "axios";
import {
  getCode,
  getCodeGeneratedState,
} from "../../../../../services/HttpService/ProfessorsService";
import { ISessionData } from "../../../../../models/ISessionData";
import {
  MessagingEvent,
  LectureTimerEventType,
} from "../../../../../models/Enums";
import { useTranslation } from "react-i18next";

const ProfessorCodeGeneration = () => {
  const { t } = useTranslation();
  const [queryParameters] = useSearchParams();

  const userIdParam: string | null = queryParameters.get("userId");
  const userId = userIdParam != null ? parseInt(userIdParam) : -1;

  const subjectIdParam: string | null = queryParameters.get("subjectId");
  const subjectId = subjectIdParam != null ? parseInt(subjectIdParam) : -1;

  const [currentCodeState, setCurrentCodeState] = useState<CodeGenerationState>(
    CodeGenerationState.notGenerated
  );
  const [code, setCode] = useState<string>();
  // TODO: Refactor below method to use only one method for getting code state and code
  useEffect(() => {
    const sessionData: ISessionData = {
      userId: userId,
      subjectId: subjectId,
    };

    const initCodeGeneratedState = async () => {
      await getCodeGeneratedState(sessionData).then((res: any) => {
        if (res && res.status === HttpStatusCode.Created && res.data) {
          setCurrentCodeState(res.data);
        }
      });
    };

    const initCode = async () => {
      await getCode(sessionData).then((res: any) => {
        if (res && res.status === HttpStatusCode.Created && res.data) {
          setCode(res.data);
        }
      });
    };

    initCodeGeneratedState();
    initCode();
    joinActiveSession(sessionData);
  }, [currentCodeState, code, subjectId, userId]);

  const [timer, setTimer] = useState<string>("");
  useEffect(() => {
    function onTimerEvent(value: any) {
      if (value && value.session) {
        const sessionData: ISessionData = JSON.parse(value.session);
        if (
          sessionData.userId === userId &&
          sessionData.subjectId === subjectId
        ) {
          if (value.lectureTimerEventType === LectureTimerEventType.Tick) {
            setTimer(value.lectureTimerCount);
          } else if (
            value.lectureTimerEventType === LectureTimerEventType.Stop
          ) {
            setTimer("");
          }
        }
      }
    }
    listening(MessagingEvent.LectureTimerEvent, onTimerEvent);

    function onCodeEvent(value: any) {
      if (value && value.session) {
        const sessionData: ISessionData = JSON.parse(value.session);
        if (
          sessionData.userId === userId &&
          sessionData.subjectId === subjectId
        ) {
          setCode(value.lectureCodeValue);
          setCurrentCodeState(value.lectureCodeEventType);
        }
      }
    }
    listening(MessagingEvent.LectureCodeEvent, onCodeEvent);

    return () => {
      dispose(MessagingEvent.LectureTimerEvent, onTimerEvent);
      dispose(MessagingEvent.LectureCodeEvent, onCodeEvent);
    };
  }, [subjectId, timer, userId]);

  const handleGenerateCodeClick = () => {
    const sessionData: ISessionData = {
      userId: userId,
      subjectId: subjectId,
    };

    onStartLectureWork(sessionData);
  };

  const handleCancelGenerateCodeClick = () => {
    const sessionData: ISessionData = {
      userId: userId,
      subjectId: subjectId,
    };

    onCancelLectureWork(sessionData);
  };

  return (
    <Card sx={{ mt: 1 }}>
      <CardContent>
        <Typography variant="h6">{t("AccessCodeGeneration")}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Stack direction="column" spacing={4}>
          {currentCodeState === CodeGenerationState.notGenerated ? (
            <>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography>
                  {t("PleaseGenerateAccessCodeForStudentsToEnter")}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Button
                  onClick={handleGenerateCodeClick}
                  variant="contained"
                  color="success"
                  size="medium"
                >
                  {
                    // @ts-ignore
                    <PinIcon fontSize="xs" sx={{ mr: 0.5 }} />
                  }
                  {t("GenerateAccessCode")}
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography>{t("StudentsShouldEnterBelowCode")}</Typography>
              </Box>
              <Box display="flex" justifyContent="center" alignItems="center">
                {timer && code && (
                  <Card>
                    <CardContent>
                      <Stack direction="column" spacing={2}>
                        <>
                          <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                          >
                            <Typography variant="h4">{code}</Typography>
                          </Box>
                          <Divider />
                          <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                          >
                            <Typography>
                              {t("TimeRemaining")}
                              {`${timer}s`}
                            </Typography>
                          </Box>
                          <LinearProgress color="success" />
                        </>
                      </Stack>
                    </CardContent>
                  </Card>
                )}
              </Box>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Button
                  onClick={handleCancelGenerateCodeClick}
                  variant="contained"
                  color="error"
                  size="medium"
                >
                  {
                    // @ts-ignore
                    <CloseIcon fontSize="xs" sx={{ mr: 0.5 }} />
                  }
                  {t("Cancel")}
                </Button>
              </Box>
            </>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProfessorCodeGeneration;
