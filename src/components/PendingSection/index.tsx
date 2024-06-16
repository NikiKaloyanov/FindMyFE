import "./PendingSection.css";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { acceptDeclinePendingLocation } from "../../api/acceptDeclinePendingLocation.ts";
import { useHooksContext } from "../../hooks/useHooksContext.tsx";

type Props = {
  username: string;
};

const PendingSection = (props: Props) => {
  const { headersHook, userDataHook } = useHooksContext();

  const handleAccept = () => {
    acceptDeclinePendingLocation(
      headersHook.userData.username,
      props.username,
      true,
    ).catch(() => userDataHook.removeFromPending(props.username));
  };

  const handleReject = () => {
    acceptDeclinePendingLocation(
      headersHook.userData.username,
      props.username,
      false,
    ).catch(() => userDataHook.removeFromPending(props.username));
  };

  return (
    <div className="pending-container">
      {props.username}
      <div className="buttons-container">
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
      </div>
    </div>
  );
};

export default PendingSection;
