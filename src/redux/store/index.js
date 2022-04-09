import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import { itemReducer } from "./itemReducer";

const reducer = combineReducers({ item: itemReducer });

const store = createStore(reducer, compose(applyMiddleware(thunk)));

export default store;
