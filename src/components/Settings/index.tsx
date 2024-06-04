import "./Settings.css";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useHooksContext } from "../../hooks/useHooksContext.tsx";
import PendingSection from "../PendingSection";
import Box from "@mui/material/Box";

type Props = {
  handleClose: () => void;
};

const Settings = (props: Props) => {
  const [closeAnimation, setCloseAnimation] = useState<boolean>(false),
    { userDataHook } = useHooksContext();

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
      <Box>
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
        {userDataHook.pendingLocations.length > 0 && (
          <div className="pending-list">
            <div>Location Requests</div>
            {userDataHook.pendingLocations.map((it) => (
              <div className="pending-padding">
                <PendingSection username={it} />
              </div>
            ))}
          </div>
        )}
      </Box>
    </div>
  );
};

export default Settings;
