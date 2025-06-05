import { createContext, useContext, useEffect, useReducer } from "react";
import reducer, { initialState } from "./reducer";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router";


const OrderContext = createContext(null);

export const OrderProvider = ({children}) =>{
    const navigate = useNavigate()
    const { user } = useAuth()
    const [ state, dispatch ] = useReducer(reducer,initialState);

    useEffect(() => {
        localStorage.setItem("cartItems",JSON.stringify({
            products:state.products,
            total:state.total
        }))
    },[state]);

    const calculateTotalPrice = (products) =>{
        let total = 0;
       products.forEach(product => 
             total += product.price * product.quantity 
        );

        dispatch({
            type:"CALCULATE_TOTAL_PRICE",
            payload:total
        })
    }

    const AddItemToCart = (product) =>{
        if (user) {
            const productIndex = state.products.findIndex(p => p.id === product.id);
            let updatedProducts = [...state.products];
    
            if(productIndex !== -1){
                updatedProducts[productIndex] = {
                    ...updatedProducts[productIndex],
                    quantity : updatedProducts[productIndex].quantity +1
                }
            }else{
                updatedProducts = [
                    ...updatedProducts,
                    {
                        ...product, quantity:1
                    }  
                ]
            }
            calculateTotalPrice(updatedProducts);
    
            dispatch({
                type:"ADD_TO_CART",
                payload:updatedProducts
            })
        }
        else {
            navigate('/signin')
        }
       
    }


    const updateQuantity = (product,newQuantity) =>{

        const productIndex = state.products.findIndex(p => p.id === product.id);
        

        let updatedProducts = [...state.products];

        if(newQuantity <= 0){
            updatedProducts = updatedProducts.filter(p => p.id !== product.id);
        }else{
            updatedProducts[productIndex] = {
                    ...updatedProducts[productIndex],quantity:newQuantity
                }
            
        }

        calculateTotalPrice(updatedProducts);

        dispatch({
            type:"UPDATE_PRODUCT_QUANTITY",
            payload:updatedProducts
        })
    }

    const removeItemFromCart = (product) =>{
        const updatedProducts = state.products.filter(p => p.id !== product.id);

        calculateTotalPrice(updatedProducts);

        dispatch({
            type:"REMOVE_FROM_CART",
            payload:updatedProducts
        })
    }

    const clearCart  = () => {
        dispatch({
            type:"CLEAR_CART",
            
        })
    }

    const value = {
        products:state.products,
        total:state.total,
        AddItemToCart,
        updateQuantity,
        removeItemFromCart,
        clearCart
    }

    return(
        <OrderContext.Provider value={value}>
            {children}
        </OrderContext.Provider>
    )
   
}


 const useOrder = ()=>{
    const context = useContext(OrderContext);
    if(context === undefined){
        throw new Error("Context must be in orderContext !");
    }

    return context;
}

export default useOrder;