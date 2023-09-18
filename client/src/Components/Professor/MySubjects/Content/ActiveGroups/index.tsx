import {
  Button,
  Card,
  CardContent,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { LiveLectures } from "../../../../../resources/Typography";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import NumbersIcon from "@mui/icons-material/Numbers";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import PauseIcon from "@mui/icons-material/Pause";
import { IActiveGroupsProps } from "../../../../../modelHelpers/ActiveGroupsProps";
import { IGroup } from "../../../../../modelHelpers/Group";
import convertToRoman from "../../../../../functionHelpers/ConvertToRoman";

const ActiveGroups: React.FC<IActiveGroupsProps> = ({
  userId,
  groupsProp,
  handleStopSession,
  handleSessionClick,
}) => {
  const groups: IGroup[] = groupsProp;

  return (
    <>
      {groups.length > 0 ? (
        <Card sx={{ mt: 1 }}>
          <CardContent>
            <Typography variant="h6">{LiveLectures}</Typography>
            <Divider sx={{ mb: 2 }} />
            <TableContainer component={Paper} sx={{ mt: 1 }}>
              <Table sx={{ minWidth: 290 }} size="small">
                <TableHead>
                  <TableRow
                    sx={{
                      "& th": {
                        backgroundColor: "secondary.light",
                        color: "secondary.contrastText",
                      },
                    }}
                  >
                    <TableCell align="center">
                      {
                        // @ts-ignore
                        <TextFieldsIcon fontSize="xs" sx={{ mt: 1, mr: 0.5 }} />
                      }
                    </TableCell>
                    <TableCell align="center">
                      {
                        // @ts-ignore
                        <NumbersIcon fontSize="xs" sx={{ mt: 1, mr: 0.5 }} />
                      }
                    </TableCell>
                    <TableCell align="center">
                      {
                        // @ts-ignore
                        <StopCircleIcon fontSize="xs" sx={{ mt: 1, mr: 0.5 }} />
                      }
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {groups.map((group, index) => (
                    <TableRow
                      key={index}
                      hover
                      onClick={(e) => handleSessionClick(group)}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        cursor: "pointer",
                      }}
                    >
                      <TableCell align="center">{group.name}</TableCell>
                      <TableCell align="center">
                        {convertToRoman(group.groupNo)}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStopSession(group.groupId);
                          }}
                          variant="contained"
                          color="error"
                          size="small"
                          disabled={group.userId != userId}
                        >
                          <PauseIcon fontSize="small" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      ) : (
        <></>
      )}
    </>
  );
};

export default ActiveGroups;
