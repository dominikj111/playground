import React, { createContext, useReducer } from "react";

const Context = createContext({});

function Provider({ children, actions, initialState }) {
  const [state, dispatch] = useReducer((st, act) => ({ ...actions(st, act) }), {
    ...initialState,
  });

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
}

export { Context, Provider };
