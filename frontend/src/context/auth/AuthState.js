import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import axios from 'axios';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from './../types';
import setAuthToken from '../../utils/setAuthToken';

const AuthState = props => {
    const initialState = {
        isAuthenticated: null,
        loading: true,
        user: null,
        error:null
        
    }

    const [state, dispatch] = useReducer(authReducer, initialState);

    // Load User
    const loadUser = async() => {

        // include JWT in the request that sed to the backend
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
        
        try {
            // http://127.0.0.1:5000/
           const res = await axios.get('api/auth')
            
            dispatch({ type: USER_LOADED, payload: res.data });

            console.log(res.data);
            console.log('load user ran..');
        } catch (err) {
            console.log(err.response.data);
            dispatch({ type: AUTH_ERROR });
        }
        
    }

    // Register User
    const register = async formData => {
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        try {
            const res = await axios.post('api/users', formData, config);

            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })

            loadUser();


        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.msg
            })
        }


    }

    // Login User
    const loginUser = async(formData) => {
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        try {
            const res = await axios.post('api/auth', formData, config);

            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
            console.log({'login response':res});
            loadUser();


        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data.msg
            })
        }

    }

    // Logout
    const logoutUser = async() => {

        try {
            const res = await axios.get('api/auth/logout');
            dispatch({ type: LOGOUT });

        } catch (err) {
            dispatch({ type: LOGOUT });
            
        }

    }

    // Clear Errors
    const clearErrors = () => {
        dispatch({ type: CLEAR_ERRORS });
    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error,
                register,
                loadUser,
                loginUser,
                logoutUser,
                clearErrors
            }}
        >
            {props.children}
        </AuthContext.Provider>
    ) 
}

export default AuthState;




