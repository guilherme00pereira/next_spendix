import React from "react";

import { VisibilityContext } from "react-horizontal-scrolling-menu";

export function Card({
  itemId,
  selected,
  onClick,
  title,
}: {
  itemId: string;
  selected: boolean;
  onClick: Function;
  title: string;
}) {
  const visibility = React.useContext(VisibilityContext);
  const isVisible = visibility.useIsVisible(itemId, true);

  return (
    <div
      onClick={() => onClick(visibility)} // NOTE: for center items
      role="button"
      style={{
        border: "1px solid",
        display: "inline-block",
        margin: "0 10px",
        width: "120px",
        userSelect: "none",
      }}
      tabIndex={0}
      className="card"
    >
      <div>
        <div>{title}</div>
        <div style={{ backgroundColor: isVisible ? "transparent" : "gray" }}>
          visible: {JSON.stringify(isVisible)}
        </div>
        <div>selected: {JSON.stringify(!!selected)}</div>
      </div>
      <div
        style={{
          backgroundColor: selected ? "green" : "bisque",
          height: "100px",
        }}
      />
    </div>
  );
}
