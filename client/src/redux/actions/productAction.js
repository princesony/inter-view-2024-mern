import { GLOBALTYPES } from './globalTypes'
import { postDataAPI,getDataAPI } from '../../utils/fetchData'
export const PRODUCT_TYPES = {
    CREATE_PRODUCT : 'CREATE_PRODUCT',
    UPDATE_PRODUCT: "UPDATE_PRODUCT",
    REMOVE_PRODUCT:"REMOVE_PRODUCT",
    GET_PRODUCT:"GET_PRODUCT",
    LOADING_PRODUCT:"LOADING_PRODUCT"
    
}

export const getPosts = () => async (dispatch) => {
    try {
         dispatch({ type: PRODUCT_TYPES.LOADING_PRODUCT, payload: { loading: true } });
        const res = await getDataAPI('/product/v1/getproducts');
        
        dispatch({
            type: PRODUCT_TYPES.GET_PRODUCT,
            payload: res.data
        });

         dispatch({ type: PRODUCT_TYPES.LOADING_PRODUCT, payload: { loading: false } });
    } catch (err) {
         dispatch({
             type: PRODUCT_TYPES.LOADING_PRODUCT,
             payload: { loading: false }
         });
        dispatch({ 
            type: GLOBALTYPES.ALERT, 
            payload: {
                error: err.response.data.msg
            } 
        })
    }
}