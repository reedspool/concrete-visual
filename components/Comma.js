import React, { useEffect } from 'react';

export function Comma({ comma, breadcrumbs = [] }) {
    const [hovered, setHovered] = React.useState(false);
    const [isComma, setIsComma] = React.useState(comma);
    return (
        <div
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onDoubleClick={(e) => {
                  setIsComma(! isComma)
                  e.stopPropagation();
              }}
              className={[
                  "inline-block",
                  // "bg-red-900",
              ].join(" ")}
            >
            <span className={[
                  "bg-gray-100 rounded-xl heavy p-1",
                  // "bg-red-900",
                  hovered ? "shadow-inner" : ""
              ].join(" ")}>{ isComma ? "," : <>&nbsp;</> }</span>
        </div>
    )
}
