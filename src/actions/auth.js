import { AUTH} from "../constants/actionTypes";
import * as api from  "../api/index.js";


export const signin =(values, navigate) => async(dispatch) => {
    try {
        const { data} = await api.signIn(values);
        dispatch({type: AUTH, data});
        alert("Correct Email and Password!!!. Click OK to continue")
        navigate('/');
    } catch (error) {
        alert("Your credentials are not correct.")
       console.log(error) 
    }
}

export const signup = (values, navigate) => async(dispatch) => {
    try {
        const { data} = await api.signUp(values);
        dispatch({type: AUTH, data});
        alert("Account created successfully")
        navigate('/')
    } catch (error) {
       console.log(error) 
    }
}