import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { BrowserRouter as Router } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./app/store";
import ToggleColorMode from "./utils/ToggleColorMode";

ReactDOM.render(
  <Provider store={store}>
    <ToggleColorMode>
      <Router>
        <App />
      </Router>
    </ToggleColorMode>
  </Provider>,
  document.getElementById("root")
);
