import "./PendingSection.css";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { acceptDeclinePendingLocation } from "../../api/acceptDeclinePendingLocation.ts";
import { useHooksContext } from "../../hooks/useHooksContext.tsx";
import { useState } from "react";
import { CircularProgress } from "@mui/material";

type Props = {
  username: string;
};

const PendingSection = (props: Props) => {
  const { headersHook, userDataHook } = useHooksContext(),
    [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAccept = () => {
    setIsLoading(true);
    userDataHook.removeFromPending(props.username);
    acceptDeclinePendingLocation(
      headersHook.userData.username,
      props.username,
      true,
    ).catch(() => {
      userDataHook.removeFromPending(props.username);
      setIsLoading(false);
    });
  };

  const handleReject = () => {
    setIsLoading(true);
    userDataHook.removeFromPending(props.username);
    acceptDeclinePendingLocation(
      headersHook.userData.username,
      props.username,
      false,
    ).catch(() => {
      userDataHook.removeFromPending(props.username);
      setIsLoading(false);
    });
  };

  return (
    <div className="pending-container">
      {props.username}
      <div className="buttons-container">
        {isLoading ? (
          <CircularProgress color="success" />
        ) : (
          <>
            <CheckIcon
              color="success"
              className="pending-button"
              onClick={handleAccept}
            />
            <CloseIcon
              color="error"
              className="pending-button"
              onClick={handleReject}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default PendingSection;
