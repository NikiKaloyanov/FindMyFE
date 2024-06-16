import "./Settings.css";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useHooksContext } from "../../hooks/useHooksContext.tsx";
import PendingSection from "../PendingSection";
import Box from "@mui/material/Box";
import { Slider } from "@mui/material";

type Props = {
  handleClose: () => void;
  updateFrequency: number;
  handleUpdateFrequency: (
    event: Event,
    value: number | number[],
    activeThumb: number,
  ) => void;
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
        <div className="pending-list">
          {userDataHook.pendingLocations.length > 0 ? (
            <>
              <b>Location Requests</b>
              {userDataHook.pendingLocations.map((it) => (
                <div className="pending-padding">
                  <PendingSection username={it} />
                </div>
              ))}
            </>
          ) : (
            <b>No New Location Requests</b>
          )}
        </div>
        {userDataHook.knownLocations.length > 0 ? (
          <>
            <b>Added People</b>
            <div className="people-list">
              <div className="added-person">
                {userDataHook.knownLocations.map((it) => it.username)}
              </div>
            </div>
          </>
        ) : (
          <div>No Added People</div>
        )}
        <div className="slider">
          <b>Update Frequency</b>
          <Slider
            color="success"
            value={props.updateFrequency}
            onChange={props.handleUpdateFrequency}
          />
          <div>{props.updateFrequency * 50}</div>
        </div>
      </Box>
    </div>
  );
};

export default Settings;
