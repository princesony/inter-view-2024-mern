import { GLOBALTYPES } from './globalTypes'
import { postDataAPI,getDataAPI } from '../../utils/fetchData'

export  const GLOBAL_CART = {
    ADD_TO_CART : "ADD_TO_CART", 
    REMOVE_FROM_CART: "REMOVE_FROM_CART",
    REMOVE_SINGLE_ITEM : "REMOVE_SINGLE_ITEM",
    EMPTY_CART : "EMPTY_CART"
}


export const addtocart  =  (item) => async dispatch=>{
  try {
     
      const res = await postDataAPI(`/cart/v1/addcart/${item._id}`);
      dispatch({ type: GLOBALTYPES.ALERT, payload: {success: res.data.msg} })
  } catch (err) {
    dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {error: err.response.data.msg}
    })
  }
}
    
