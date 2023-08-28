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
import { onStartLectureWork, socket } from "../../../../../services/Messaging";
import { useSearchParams } from "react-router-dom";

const codeGenerationState:
  | CodeGenerationState.notGenerated
  | CodeGenerationState.generated = CodeGenerationState.notGenerated;

const ProfessorCodeGeneration = () => {
  const [queryParameters] = useSearchParams();

  const groupIdParam: string | null = queryParameters.get("groupId");
  const groupId = groupIdParam != null ? parseInt(groupIdParam) : -1;

  const [timer, setTimer] = useState<string>("");
  useEffect(() => {
    function onTimerEvent(value: any) {
      if (value.id === groupId) {
        if (value.lectureTimerEventType === "tick") {
          setTimer(value.lectureTimerCount);
        } else if (value.lectureTimerEventType === "stop") {
          setTimer("");
        }
      }
    }

    socket.on("lectureTimerEvent", onTimerEvent);

    return () => {
      socket.off("lectureTimerEvent", onTimerEvent);
    };
  }, [groupId, timer]);

  const [currentCodeState, setCurrentCodeState] =
    useState<CodeGenerationState>(codeGenerationState); // TODO: This needs to be pulled from Redis
  const [code, setCode] = useState<string>();
  useEffect(() => {
    function onCodeEvent(value: any) {
      if (value.id === groupId) {
        setCode(value.lectureCodeValue);
        setCurrentCodeState(value.lectureCodeEventType);
      }
    }

    socket.on("lectureCodeEvent", onCodeEvent);

    return () => {
      socket.off("lectureCodeEvent", onCodeEvent);
    };
  }, [groupId, code]);

  const handleGenerateCodeClick = () => {
    onStartLectureWork(groupId);
  };

  const handleCancelGenerateCodeClick = () => {
    setCurrentCodeState(CodeGenerationState.notGenerated);
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
