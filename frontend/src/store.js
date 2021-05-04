import { applyMiddleware, createStore } from "redux";
import rootReducer from "./reducers";
import { composeWithDevTools, devToolsEnhancer } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';


const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

const store = createStore(rootReducer, composedEnhancer)
export default store;