import { combineReducers } from 'redux'
import auth from './authReducer'
import alert from './alertReducer'
import products from "./productReducer"


export default combineReducers({
    auth,
    alert,
    products
   
})