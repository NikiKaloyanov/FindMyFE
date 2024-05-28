import "./Settings.css";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import { useState } from "react";

type Props = {
  handleClose: () => void;
};

const Settings = (props: Props) => {
  const [closeAnimation, setCloseAnimation] = useState<boolean>(false);

  const animationHandle = () => {
    setCloseAnimation(true);
    setTimeout(() => {
      props.handleClose();
    }, 150);
  };

  return (
    <div
      className={
        closeAnimation ? "settings-wrapper close-down" : "settings-wrapper"
      }
    >
      <div className="title-button">
        <h2>Settings</h2>
        <Button
          variant="text"
          className="settings-button"
          onClick={animationHandle}
        >
          <CloseIcon fontSize="large" className="close-button" />
        </Button>
      </div>
    </div>
  );
};

export default Settings;
