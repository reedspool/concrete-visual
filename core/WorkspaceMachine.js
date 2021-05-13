import { Machine, send } from "xstate";
import { MachineContext } from "../core/XStateReactContext";
import { assign } from '@xstate/immer';
import { parseFile } from "concrete-parser";
import Point from './point';

export const definition = {
    strict: true,
    id: "workspace",
    type: "parallel",
    states: {
        parser: {
           initial: "empty",
            states: {
              empty: {
                  entry: [ "parseTestCode"], // Testing only
                  on : { PARSE: "parsing" }
              },
              parsing: {
                  invoke: {
                      id: "parser",
                      src: "parse",
                      onDone: { target: "loaded", actions : [ "recordParsed" ] }
                  }
              },
              loaded: {
                  on : {
                      PARSE: "parsing",
                  },

                  initial: "ready",
                  states: {
                      ready: {
                          on : {
                              BLOCK_SELECTED: {
                                  actions: [ "cutBlock" ],
                                  target: "blockRemoved"
                              }
                          }
                      },
                      blockRemoved: {
                          on : {
                              BLOCK_SELECTED: {
                                  actions: [ "replaceBlock" ],
                                  target: "ready"
                              }
                          }
                      }
                  }
              },
            }
        }
    },
    on: {}
};

export const config = {
    actions: {
        parseTestCode: send((C, E) => {
            return { type: "PARSE", source: `
        n: 5
        i: 0

        start:
          i, n = _, @end jump!
          i, 1 + _, @i set!

        divisibleBy: (n k)[ n, k % _ ~ _ ]
        i, 3 divisibleBy! fizz: _
        i, 5 divisibleBy! buzz: _
        fizz, buzz & fizzbuzz: _

        fizzbuzz, @fb jump!
        fizz, @f jump!
        buzz, @b jump!

        i print! @start jump!
        fb: "FizzBuzz" print! @start jump!
        f: "Fizz" print! @start jump!
        b: "Buzz" print! @start jump!

        end:_
        ` }
        }),
        recordParsed : assign((C, E) => {
            C.rootTape = E.data.tape;
            console.log("Parsed" , C.rootTape);
        }),
        cutBlock: assign((C, { breadcrumbs }) => {
            breadcrumbs = [ ...breadcrumbs ];
            const last = breadcrumbs.pop();

            let block = C.rootTape;
            breadcrumbs.forEach((index) => {
                block = block.cells[index];
            })
            const [ removed ] = block.remove(last, 1);
            C.removedBlock = removed;
        }),
        replaceBlock: assign((C, { breadcrumbs }) => {
            breadcrumbs = [ ...breadcrumbs ];
            const last = breadcrumbs.pop();

            let block = C.rootTape;
            breadcrumbs.forEach((index) => {
                block = block.cells[index];
            })
            block.insert(C.removedBlock, last);
            C.removedBlock = null;
        })
    },
    guards : {},
    services : {
        parse: (C, E) => parseFile(E.source)
    }
};

export const init = () => Machine(definition, config).withContext({});

export const Context = new MachineContext(init());
