import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import axios from "axios";
import React from "react";

function EditUserProfile({ profile, showModal, onHide }) {
  const { id, username, phoneNumber, department } = profile;
  console.log(profile);
  const [updateUser, setUpdateUser] = React.useState({
    username: username,
    phoneNumber: phoneNumber,
    department: department,
  });

  const handleSubmit = () => {
    axios
      .put(
        `http://localhost:8080/users/${id}`,
        {
          username: updateUser.username,
          password: updateUser.password,
          phoneNumber: updateUser.phoneNumber,
          department: updateUser.department,
        },
        {
          headers: {
            Pragma: sessionStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setUpdateUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    handleClose();
  };

  const handleClose = () => {
    onHide();
  };

  return (
    <div>
      <Dialog open={showModal} onClose={handleClose}>
        <DialogTitle>Edit</DialogTitle>
        <DialogContent>
          <Grid container rowSpacing={2}>
            <Grid item xs={12} sm={9}>
              <TextField
                required
                id="username"
                name="username"
                label="username"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                value={updateUser.username}
                onChange={(event) =>
                  setUpdateUser((prev) => ({
                    ...prev,
                    username: event.target.value,
                  }))
                }
              />
            </Grid>

            <Grid item xs={12} sm={9}>
              <TextField
                required
                id="phonenumber"
                name="phonenumber"
                label="phonenumber"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                value={updateUser.phoneNumber}
                onChange={(event) =>
                  setUpdateUser((prev) => ({
                    ...prev,
                    phoneNumber: event.target.value,
                  }))
                }
              />
            </Grid>
            <Grid item xs={12} sm={9}>
              <TextField
                required
                id="department"
                name="department"
                label="department"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                value={updateUser.department}
                onChange={(event) =>
                  setUpdateUser((prev) => ({
                    ...prev,
                    department: event.target.value,
                  }))
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Edit Profile</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditUserProfile;
