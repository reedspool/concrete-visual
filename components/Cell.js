import React, { useEffect } from 'react';
import { Context as CoreContext } from "../core/CoreMachine";
import { Context as WorkspaceContext } from "../core/WorkspaceMachine";
import { Category } from "concrete-parser";
import { Comma as Separator } from "./Comma"
import { Tape } from "./Tape"


export function Cell({ block, comma, label, head, inFlow = true, breadcrumbs = [] }) {
    const [ coreState, coreSend ] = CoreContext.use();
    const [ workspaceState, workspaceSend ] = WorkspaceContext.use();
    const [hovered, setHovered] = React.useState(false);
    const classList = [
        "inline",
        "relative"
    ];
    const { id } = block;
    return (
        <li className={classList.join(" ")}
            >
          <span className="inline-block">
            <Separator comma={comma}></Separator>
            {/* I think I shuold actually use flexbox for all of this */}
            { label ? <span className="absolute text-xs -top-4 left-0">{label}:</span> : null }
            <span
              className={[
                  "inline p-1 px-2 m-1 ",
                  "rounded-xl bg-gray-100",
                  "cursor-pointer",
                  // If head or hovered, swap the border, so keep an invisible border
                  "border border-transparent",
                  head ? "border-red-800" : "",
                  hovered ? "border-black shadow-inner" : "",
                ].join(" ")}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onClick={(e) => {
                  const { width } = e.target.getBoundingClientRect();
                  console.log("width", width)
                  workspaceSend("BLOCK_SELECTED", { breadcrumbs, width });
                  e.stopPropagation();
              }}
            >
              { block.is(Category.Value, "Tape") ? <>[<Tape tape={block} breadcrumbs={breadcrumbs} />]</>
                  : block.is(Category.Value, "Number") ? `${block.asJS()}`
                  : block.is(Category.Value, "String") ? `"${block.asJS()}"`
                  : block.is(Category.Value, "Blank") ? `_`
                  : block.is(Category.Value, "ValueIdentifier") ? `${block.identifier}`
                  : block.is(Category.Op, "CallIdentifier") ? `${block.identifier}!`
                  : block.is(Category.Value, "AddressIdentifier") ? `@${block.identifier}`
                  : null
              }
            </span>
          </span>
        </li>
    )
}
