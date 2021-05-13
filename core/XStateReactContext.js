import React, { useEffect } from 'react';
import { useMachine } from "@xstate/react";

export class MachineContext {
  constructor(machine) {
    this.machine = machine;

    // Custom tags have to be bound to this, because when used as JSX Tags, no this.
    this.Visible = (props) => {
      return <Visible machine={this.use()} { ...props }/>
    }
  }

  // Provide shuold be called at the top level component, where you are going
  // use <Provider>, it calls useMachine for you
  provide() {
    const service = useMachine(this.machine, { devTools: true });
    this.context = React.createContext(service);

    return ({ children }) => <this.context.Provider value={service}>{ children }</this.context.Provider>
  }

  use() {
    return React.useContext(this.context);
  }
}

// Only show children if state.matches(when);
// <Visible when="red" machine={lightMachine}>
export function Visible({ children, when, machine }) {
  const [ state, _ ] = machine;

  return (
    <>
        { state.matches(when) ? children  : <></> }
    </>
  )
}
