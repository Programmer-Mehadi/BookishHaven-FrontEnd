import { Middleware } from "@reduxjs/toolkit";
const logger: Middleware = (store) => (next) => (action) => {
  console.log("Current state", store.getState());
  console.log("action", action);
  next(action);
  console.log("Next state", store.getState());
};

export default logger;