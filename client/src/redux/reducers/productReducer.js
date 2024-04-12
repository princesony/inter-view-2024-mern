import { PRODUCT_TYPES } from '../actions/productAction';
import { EditData, DeleteData } from '../actions/globalTypes';

const initialState = {
    products: [],
    loading: false // Add loading state to the initial state
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCT_TYPES.CREATE_PRODUCT:
            return {
                ...state,
                products: [action.payload, ...state.products]
            };
        case PRODUCT_TYPES.GET_PRODUCT:
            return {
                ...state,
                products: action.payload
            };
        case PRODUCT_TYPES.UPDATE_PRODUCT:
            return {
                ...state,
                products: EditData(state.products, action.payload._id, action.payload)
            };
        case PRODUCT_TYPES.REMOVE_PRODUCT:
            return {
                ...state,
                products: DeleteData(state.products, action.payload._id)
            };
        case PRODUCT_TYPES.LOADING_PRODUCT:
            return {
                ...state,
                loading: action.payload // Update loading state
            };
        default:
            return state;
    }
};

export default productReducer;
