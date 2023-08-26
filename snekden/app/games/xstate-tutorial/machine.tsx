import { createMachine, assign } from 'xstate';

interface Context {
  retries: number;
}

const fetchMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QDMwBcDGALAdASwgBswBiAMQFEAVAYQAkBtABgF1FQAHAe1jzTy4A7diAAeiAIwBWAEw4A7AGYAnKpnymANnlTlTACwAaEAE9EMmcpz6AHFKYP5ymZsU358gL6fjqTLkIuAEMIPEEoEgAlCgBlAHkAGQA1CmY2JBBuXn4hEXEERSccC31lGxcJfQllCU1jMwRpG2ty2TbVPUVFb190bBxAkLCI6IApChoqNJEsvgFhDPzpOSUO9S0dPSNTRBsJFocmav15CXlNJhsekD9+5CC8QgBXACdSaKpIgE1pjNmchagJayBQqNQabS6Az1SSKfbKfSHAyI0rOa63XCwJ4YDBwWAkCgANzAgjQAAIJL9ODw5rlFogpBJFMVKmV9PoZOV5DIpDCEMp5MUSu4qooOU5utdBFwIHARBiZjSAXlEABaOo7BDquQ8+S2TTSPQyDnovq4AjERXZeYqhAcvkWKzKTSqGylQqqCQyU3+AbBULhK20wFicyafQ4eyHfRSWPuI58prWSG1GzOXVonw3M04LE4vFB5X0u3KZmaY2qJhOU4dRNSQUWY0ipni0s+u4PZ5vQs24v2zXuSP6TTadwSJjOxSadu4QRgADuZNgaCCaDAFJ7dKBDKOLNKbo5XJ5DqkQqbepb6mcV28niAA */
  createMachine<Context>({
    id: 'fetch',
    initial: 'idle',
    context: {
      retries: 0
    },
    states: {
      idle: {
        on: {
          FETCH: 'loading'
        }
      },

      loading: {
        on: {
          RESOLVE: 'success',
          REJECT: 'failure'
        }
      },

      success: {
        type: 'final',

        on: {
          "Event 1": "new state 1"
        }
      },

      failure: {
        on: {
          RETRY: {
            target: 'loading',
            actions: assign({
              retries: (context, event) => context.retries + 1
            })
          }
        }
      },

      "new state 1": {}
    }
  });



