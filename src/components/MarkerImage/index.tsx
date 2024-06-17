import "./MarkerImage.css";
import { useState } from "react";
import { Unstable_Popup as BasePopup } from "@mui/base/Unstable_Popup";
import { ClickAwayListener, styled } from "@mui/material";
import { grey } from "@mui/material/colors";

type Props = {
  initials: string;
  image?: string;
  message?: string;
};

const PopupBody = styled("div")(
  ({ theme }) => `
  width: max-content;
  padding: 12px 16px;
  margin: 8px;
  border-radius: 8px;
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  box-shadow: ${
    theme.palette.mode === "dark"
      ? `0px 4px 8px rgb(0 0 0 / 0.7)`
      : `0px 4px 8px rgb(0 0 0 / 0.1)`
  };
  font-size: 0.875rem;
  z-index: 1;
`,
);

const MarkerImage = (props: Props) => {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(anchor ? null : event.currentTarget);
  };

  const handleClickAway = () => {
    setAnchor(null);
  };

  const open = Boolean(anchor);
  const id = open ? "simple-popper" : undefined;

  return (
    <>
      {open && props.message && (
        <ClickAwayListener onClickAway={handleClickAway}>
          <BasePopup id={id} open={open} anchor={anchor} placement="top">
            <PopupBody>{props.message}</PopupBody>
          </BasePopup>
        </ClickAwayListener>
      )}
      <div
        aria-describedby={id}
        className={
          props.message
            ? "marker-background marker-with-message"
            : "marker-background"
        }
        onClick={handleClick}
      >
        {props.image ? (
          <img alt={"Profile image of " + props.initials} src={props.image} />
        ) : (
          props.initials
        )}
      </div>
    </>
  );
};

export default MarkerImage;
