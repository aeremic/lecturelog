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
import {
  AccessCodeGeneration,
  Cancel,
  GenerateAccessCode,
  PleaseGenerateAccessCodeForStudentsToEnter,
  StudentsShouldEnterBelowCode,
  TimeRemaining,
} from "../../../../../resources/Typography";
import PinIcon from "@mui/icons-material/Pin";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { CodeGenerationState } from "../../../../../models/Enums";
import {
  onCancelLectureWork,
  onStartLectureWork,
  socket,
} from "../../../../../services/Messaging";
import { useSearchParams } from "react-router-dom";
import { HttpStatusCode } from "axios";
import {
  getCode,
  getCodeGeneratedState,
} from "../../../../../services/ProfessorsService";
import { ISessionData } from "../../../../../modelHelpers/SessionData";

const ProfessorCodeGeneration = () => {
  const [queryParameters] = useSearchParams();

  const userIdParam: string | null = queryParameters.get("userId");
  const userId = userIdParam != null ? parseInt(userIdParam) : -1;

  const groupIdParam: string | null = queryParameters.get("groupId");
  const groupId = groupIdParam != null ? parseInt(groupIdParam) : -1;

  const [currentCodeState, setCurrentCodeState] = useState<CodeGenerationState>(
    CodeGenerationState.notGenerated
  );
  const initCodeGeneratedState = async () => {
    await getCodeGeneratedState(groupId).then((res: any) => {
      if (res && res.status === HttpStatusCode.Ok && res.data) {
        setCurrentCodeState(res.data);
      }
    });
  };
  initCodeGeneratedState();

  const [timer, setTimer] = useState<string>("");
  useEffect(() => {
    function onTimerEvent(value: any) {
      if (value && value.session) {
        const sessionData: ISessionData = JSON.parse(value.session);
        if (sessionData.userId === userId && sessionData.groupId === groupId) {
          if (value.lectureTimerEventType === "tick") {
            setTimer(value.lectureTimerCount);
          } else if (value.lectureTimerEventType === "stop") {
            setTimer("");
          }
        }
      }
    }

    socket.on("lectureTimerEvent", onTimerEvent);

    return () => {
      socket.off("lectureTimerEvent", onTimerEvent);
    };
  }, [groupId, timer, userId]);

  const [code, setCode] = useState<string>();
  const initCode = async () => {
    await getCode(groupId).then((res: any) => {
      if (res && res.status === HttpStatusCode.Ok && res.data) {
        setCode(res.data);
      }
    });
  };
  initCode();

  useEffect(() => {
    function onCodeEvent(value: any) {
      if (value && value.session) {
        const sessionData: ISessionData = JSON.parse(value.session);
        if (sessionData.userId === userId && sessionData.groupId === groupId) {
          setCode(value.lectureCodeValue);
          setCurrentCodeState(value.lectureCodeEventType);
        }
      }
    }

    socket.on("lectureCodeEvent", onCodeEvent);

    return () => {
      socket.off("lectureCodeEvent", onCodeEvent);
    };
  }, [groupId, code, userId]);

  const handleGenerateCodeClick = () => {
    const sessionData: ISessionData = {
      userId: userId,
      groupId: groupId,
    };

    onStartLectureWork(JSON.stringify(sessionData));
  };

  const handleCancelGenerateCodeClick = () => {
    const sessionData: ISessionData = {
      userId: userId,
      groupId: groupId,
    };

    onCancelLectureWork(JSON.stringify(sessionData));
  };

  return (
    <Card sx={{ mt: 1 }}>
      <CardContent>
        <Typography variant="h6">{AccessCodeGeneration}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Stack direction="column" spacing={4}>
          {currentCodeState === CodeGenerationState.notGenerated ? (
            <>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography>
                  {PleaseGenerateAccessCodeForStudentsToEnter}
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
                  {GenerateAccessCode}
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography>{StudentsShouldEnterBelowCode}</Typography>
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
                              {TimeRemaining}
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
                  {Cancel}
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
