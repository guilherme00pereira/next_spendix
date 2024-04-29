import {useContext, ReactNode} from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { VisibilityContext } from "react-horizontal-scrolling-menu";
import KeyboardDoubleArrowLeftRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftRounded';
import KeyboardDoubleArrowRightRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowRightRounded';

const ArrowButton = styled(Button)(({ theme }) => ({
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 1,
    backgroundColor: theme.palette.background.paper,
    borderRadius: "50%",
    "&:hover": {
        backgroundColor: theme.palette.action.hover,
    },
    }));

export function LeftArrow() {
  const visibility = useContext(VisibilityContext);
  const isFirstItemVisible = visibility.useIsVisible("first", true);

  return (
    <Arrow disabled={isFirstItemVisible} action={() => visibility.scrollPrev()}>
      <KeyboardDoubleArrowLeftRoundedIcon />
    </Arrow>
  );
}

export function RightArrow() {
  const visibility = useContext(VisibilityContext);
  const isLastItemVisible = visibility.useIsVisible("last", false);

  return (
    <Arrow disabled={isLastItemVisible} action={() => visibility.scrollNext()}>
      <KeyboardDoubleArrowRightRoundedIcon />
    </Arrow>
  );
}

function Arrow({ children, disabled, action }: { children: ReactNode; disabled: boolean; action: VoidFunction }) {
  return (
    <ArrowButton onClick={action} disabled={disabled}>
      {children}
    </ArrowButton>
  );
}
