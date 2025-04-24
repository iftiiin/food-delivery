export const initialState = JSON.parse(localStorage.getItem("cartItems")) || {
    products:[],
    total:0
 };

const reducer = (state, action) => {
    const {type, payload} = action
    switch(type){
        case 'ADD_TO_CART':
            return {
                ...state,
                products: payload
            }
        case 'UPDATE_PRODUCT_QUANTITY':
            return {
                ...state,
                products: payload
            }
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                products: payload
            }
        case 'CALCULATE_TOTAL_PRICE':
            return {
                ...state,
                total: payload
            }
        case 'CLEAR_CART':
            return initialState;
        default:
            throw new Error('Unknown reducer action')
    }
}

export default reducer