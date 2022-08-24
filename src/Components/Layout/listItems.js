import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Link } from "react-router-dom";
import { isUser } from "../Utilities/LoggedInUserInfo";
export const mainListItems = (
  <Link style={{ textDecoration: "none", color: "black" }} to="/home">
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
  </Link>
);

export const secondaryListItems = (
  <>
    <Link
      style={{ textDecoration: "none", color: "black" }}
      to="/ongoingScheduled"
    >
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Ongoing Scheduled" />
      </ListItemButton>
    </Link>
    {!isUser() && (
      <Link style={{ textDecoration: "none", color: "black" }} to="/addRoom">
        <ListItemButton>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Add Room" />
        </ListItemButton>
      </Link>
    )}
  </>
);
