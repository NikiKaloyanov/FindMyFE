import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

type Props = {
  open: boolean;
  handleCloseDialog: (email?: string) => void;
};

const FormDialog = (props: Props) => {
  return (
    <>
      <Dialog
        open={props.open}
        onClose={() => props.handleCloseDialog()}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const email = formJson.email;
            props.handleCloseDialog(email);
          },
        }}
      >
        <DialogTitle>Add Shared Location</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To send a request to add a shared location to your map, enter the email of the account.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.handleCloseDialog()}>Cancel</Button>
          <Button type="submit">Request</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FormDialog;
