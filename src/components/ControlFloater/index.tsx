import "./ControlFloater.css";
import { ReactElement, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  text?: string;
  children?: ReactElement;
};

const ControlFloater = (props: Props) => {
  const [hideWelcome, setHideWelcome] = useState<boolean>(false),
    [closeAnimation, setCloseAnimation] = useState<boolean>(false);

  const handleClose = () => {
    setCloseAnimation(true);
    setTimeout(() => setHideWelcome(true), 300);
  };

  return (
    <div>
      <div
        className={
          hideWelcome ? "hide" : closeAnimation ? "floater floater-close" : "floater"
        }
        onClick={handleClose}
      >
        <div>{props.text}</div>
        <CloseIcon fontSize="small" className="text" />
      </div>
      <div className="floater-body">
        <div className="control-body">{props.children}</div>
      </div>
    </div>
  );
};

export default ControlFloater;
