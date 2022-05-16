import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./store";
import AxiosConfig from "plugins/axios";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <AxiosConfig />
      <App />
    </Provider>
  </BrowserRouter>
);
