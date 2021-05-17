import axios from 'axios'
import { 
    PRODUCT_REQUEST,
    PRODUCT_SUCCESS,
    PRODUCT_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,    
} from '../constants/productConstants'

export const listProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST})

        const { data } = await axios.get('/api/products')
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
    } catch(err) {
        
        dispatch({ 
            type: PRODUCT_LIST_FAIL, 
            payload: err.response && err.response.data.message 
                ? err.response.data.message 
                : err.message
        })
    }
    
}

export const productDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_REQUEST})

        const { data } = await axios.get(`/api/products/${id}`)
        dispatch({type: PRODUCT_SUCCESS, payload: data})
    } catch(err) {
        dispatch({type: PRODUCT_FAIL, payload: err})
    }
}