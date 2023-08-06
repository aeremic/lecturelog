import {
  Button,
  Card,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { AssignedSubjects, Begin } from "../../../../../resources/Typography";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import NumbersIcon from "@mui/icons-material/Numbers";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import { IAssignedGroupsProps } from "../../../../../modelHelpers/AssignedGroupsProps";
import { IGroup } from "../../../../../modelHelpers/Group";
import EditIcon from "@mui/icons-material/Edit";
import convertToRoman from "../../../../../functionHelpers/ConvertToRoman";

const AssignedGroups: React.FC<IAssignedGroupsProps> = ({
  groupsProp,
  tempProp,
}) => {
  const groups: IGroup[] = groupsProp;

  return (
    <Card sx={{ mt: 1 }}>
      <CardContent>
        <Typography variant="h6">{AssignedSubjects}</Typography>
        <TableContainer component={Paper} sx={{ mt: 1 }}>
          <Table sx={{ minWidth: 290 }} size="small">
            <TableHead>
              <TableRow
                sx={{
                  "& th": {
                    backgroundColor: "primary.light",
                    color: "primary.contrastText",
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
                    <BorderColorIcon fontSize="xs" sx={{ mt: 1, mr: 0.5 }} />
                  }
                </TableCell>
                <TableCell align="center">
                  {
                    // @ts-ignore
                    <SmartDisplayIcon fontSize="xs" sx={{ mt: 1, mr: 0.5 }} />
                  }
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {groups.map((group, index) => (
                <TableRow
                  key={index}
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
                      }}
                      variant="outlined"
                      color="info"
                      size="small"
                    >
                      <EditIcon fontSize="small" />
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      variant="contained"
                      color="success"
                      size="small"
                    >
                      <PlayArrowIcon fontSize="small" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default AssignedGroups;
