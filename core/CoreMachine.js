import { Machine, send } from "xstate";
import { MachineContext } from "../core/XStateReactContext";
import { assign } from "@xstate/immer";

export const definition = {
    strict: true,
    id: "core",
    type: "parallel",
    states: {
        workspace: {
            initial: "live",
            states: {
                live: {}
            }
        },
    },
    on: {}
};

export const config = {
    actions: {

    },
    guards : {},
};

export const init = () => Machine(definition, config).withContext({});

export const Context = new MachineContext(init());
