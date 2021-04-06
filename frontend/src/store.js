import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailsReducer,
} from "./reducers/productReducer.js";
import { cartReducer } from "./reducers/cartReducer.js";
import {
  userLoginReducer,
  userRegisterReducer,
} from "./reducers/userReducer.js";
const cartFromLocalStorage = JSON.parse(localStorage.getItem("cartItems"));

const userFromLocalStorage = JSON.parse(localStorage.getItem("userInfo"));

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
});
const initialState = {
  cart: { cartItems: cartFromLocalStorage ? cartFromLocalStorage : [] },
  userLogin: { userInfo: userFromLocalStorage ? userFromLocalStorage : null },
  userRegister: {
    userInfo: userFromLocalStorage ? userFromLocalStorage : null,
  },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
