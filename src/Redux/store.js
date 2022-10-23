import { legacy_createStore, compose } from "redux";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { reducer } from "./AppReducer/reducer";

const devtools = () => {
  return (
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
};

export const store = legacy_createStore(
  reducer,
  compose(applyMiddleware(thunk), devtools())
);
