import "./Settings.css";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useHooksContext } from "../../hooks/useHooksContext.tsx";
import PendingSection from "../PendingSection";
import Box from "@mui/material/Box";
import { CircularProgress, Slider } from "@mui/material";
import TextField from "@mui/material/TextField";
import { setMessage } from "../../api/setMessage.ts";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteSharedLocation } from "../../api/deleteSharedLocation.ts";
import { UserLocation } from "../../hooks/useUserData.ts";

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
    [message, setUserMessage] = useState<string>(""),
    [isLoading, setIsLoading] = useState<boolean>(false),
    [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false),
    [closerThan50, setCloserThan50] = useState<Array<UserLocation>>([]),
    [furtherThan50, setFurtherThan50] = useState<Array<UserLocation>>([]),
    { userDataHook } = useHooksContext();

  const animationHandle = () => {
    setCloseAnimation(true);
    setTimeout(() => {
      props.handleClose();
    }, 150);
  };

  const handleSendMessage = () => {
    setIsLoading(true);
    setMessage(localStorage.getItem("username") as string, message).catch(
      () => {
        setIsLoading(false);
        setUserMessage("");
      },
    );
  };

  const handleDelete = (sender: string) => {
    setIsDeleteLoading(true);
    deleteSharedLocation(
      sender,
      localStorage.getItem("username") as string,
    ).catch(() => {
      userDataHook.removeFromKnownLocations(sender);
      setIsDeleteLoading(false);
    });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((data) => {
      const lessThan50km = userDataHook.knownLocations.filter(
        (it) =>
          userDataHook.distanceInKmBetweenEarthCoordinates(
            data.coords.latitude,
            data.coords.longitude,
            it.latitude,
            it.longitude,
          ) <= 50,
      );
      setCloserThan50(lessThan50km);
      const moreThan50km = userDataHook.knownLocations.filter(
        (it) =>
          userDataHook.distanceInKmBetweenEarthCoordinates(
            data.coords.latitude,
            data.coords.longitude,
            it.latitude,
            it.longitude,
          ) > 50,
      );
      setFurtherThan50(moreThan50km);
    });
  }, []);

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
            {closerThan50.length > 0 && (
              <>
                <p>People closer than 50km</p>
                {closerThan50.map((it) => (
                  <div id={it.username}>
                    <div className="people-list">
                      <div className="added-person">
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          {it.username}
                          <DeleteIcon
                            color={isDeleteLoading ? undefined : "error"}
                            onClick={() => handleDelete(it.username)}
                          />
                        </Box>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
            {furtherThan50.length > 0 && (
              <>
                <p>People further than 50km</p>
                {furtherThan50.map((it) => (
                  <div id={it.username}>
                    <div className="people-list">
                      <div className="added-person">
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          {it.username}
                          <DeleteIcon
                            color={isDeleteLoading ? undefined : "error"}
                            onClick={() => handleDelete(it.username)}
                          />
                        </Box>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </>
        ) : (
          <b>No Added People</b>
        )}
        <div className="slider">
          <b>Update Frequency</b>
          <Slider
            color="success"
            value={props.updateFrequency}
            onChange={props.handleUpdateFrequency}
          />
          <div>{props.updateFrequency * 50}ms</div>
        </div>
        <Box sx={{ padding: "1rem 0" }}>
          <b>Popup Message</b>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: "0.5rem 0",
            }}
          >
            <TextField
              id="standard-basic"
              label="Set Popup Message"
              variant="outlined"
              value={message}
              onChange={(value) => setUserMessage(value.target.value)}
            />
            <Button
              variant="outlined"
              color="success"
              onClick={handleSendMessage}
            >
              {isLoading ? <CircularProgress color="success" /> : "SEND"}
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Settings;
