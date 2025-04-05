import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { store } from "./store";
import { Provider } from "react-redux";
import { setAuthToken } from "./utils/auth";

// Initialize auth token if exists
const token = localStorage.getItem("token");
if (token) {
  setAuthToken(token);
  store.dispatch({ type: "auth/setToken", payload: token });
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
