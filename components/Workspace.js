import React, { useEffect } from 'react';
import { useMachine } from "@xstate/react";
import { Context as WorkspaceContext } from "../core/WorkspaceMachine";
import { Tape } from "../components/Tape";
import { Cell } from "./Cell";

export function Workspace({  }) {
  const Provider = WorkspaceContext.provide();
  const Visible = WorkspaceContext.Visible;
  const [ state, send ] = WorkspaceContext.use();
  const { rootTape, removedBlock }  = state.context;
  const [ mouseCoords, setMouseCoords ] = React.useState({ x: 0, y: 0 });

  return (
    <Provider>
      <section className="inset" >
          <Visible when="parser.empty"><span>No parsed result yet</span></Visible>
        <Visible when="parser.parsing"><span>Parsing...</span></Visible>
        <Visible when="parser.loaded">
          <Visible when="parser.loaded.ready"><div>Click any block to remove it.</div></Visible>
          <Visible when="parser.loaded.blockRemoved">
            <div>Click a block to insert <Tape block={removedBlock} /> there.</div>
            {/* <div className="fixed" style={{ top: mouseCoords.y + 5, left: mouseCoords.x + 5 }} > */}
            {/*   <Tape block={removedBlock} /> */}
            {/* </div> */}
          </Visible>
          <Tape tape={rootTape}/>
        </Visible>
      </section>
    </Provider>
  )
}
