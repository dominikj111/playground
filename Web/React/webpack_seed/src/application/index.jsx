import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "./Context";
import EntryComponent from "./EntryComponent";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const actions = (state, { type, payload }) => {
  switch (type) {
    case "setModalId":
      return { ...state, modal: { ...state.modal, id: payload } };
    default:
      return state;
  }
};

root.render(
  <StrictMode>
    <Provider
      initialState={{ modalState: "hide", modal: {} }}
      actions={actions}
    >
      <EntryComponent />
    </Provider>
  </StrictMode>
);
