import React, { useEffect } from 'react';
import { Cell } from "./Cell";

export function Tape({ tape = [], block, breadcrumbs = [] }) {
  // As a convenience for the common concept of a tape with a single block on it
  // allow tape to also take a single block and just wrap a cell
    const cells = block ? <Cell block={block}/>
          : tape.cells.map((block, index) => (
            <Cell
              key={index}
              block={block}
              comma={tape.commas[index]}
              label={tape.labelsByIndex[index]}
              breadcrumbs={ [ ...breadcrumbs, index ] }/>
        ));
    return (
        <ol className="w-full h-full inline px-1 py-3 m-1 text-gray-600 font-mono rounded-lg bg-gray-200 leading-10">
            {cells}</ol>
    )
}
