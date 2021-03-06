import React from "react";
//@ts-ignore
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

import Theme from "../theme/default";

export interface FloatingActionButtonProps {
  accentColor?: string;
  actions: {
    icon: IconDefinition;
    tooltip: string;
    action: () => void;
  }[];
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = (props) => {
  if (typeof window === "undefined") {
    return <div />;
  }
  const Container = require("react-floating-action-button").Container;
  const Button = require("react-floating-action-button").Button;
  return (
    <Container styles={{ bottom: "4vh", right: "3vw" }}>
      {props.actions.map((action) => {
        return (
          <Button
            key={action.tooltip}
            tooltip={action.tooltip}
            onClick={action.action}
            styles={{
              backgroundColor: props.accentColor || Theme.DEFAULT_ACCENT_COLOR,
              color: "white",
              cursor: "pointer",
            }}
          >
            <FontAwesomeIcon icon={action.icon} />
          </Button>
        );
      })}
    </Container>
  );
};

export default FloatingActionButton;
