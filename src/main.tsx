import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import store from "./redux/store.ts";
import routes from "./routes/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <div>
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={routes}></RouterProvider>
      </Provider>
    </React.StrictMode>
  </div>
);
