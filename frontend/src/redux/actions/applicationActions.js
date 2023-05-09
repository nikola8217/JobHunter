import axios from "axios";
import baseURL from "../config";

export const apply = (application) => async (dispatch, getState) => {
    try {
        dispatch({type: 'APPLICATION_CREATE_REQUEST'});

        const {
            userLogin: { userInfo }
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.post(`${baseURL}/applications`, application, config);

        dispatch({
            type: 'APPLICATION_CREATE_SUCCESS',
            payload: data
        });

        localStorage.setItem('userInfo', JSON.stringify(data));

    } catch (error) {
        dispatch({
            type: 'APPLICATION_CREATE_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const checkApplication = (userId, job) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'APPLICATION_DETAILS_REQUEST' });

        const {
            userLogin: { userInfo }
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.get(`${baseURL}/applications?user=${userId}&job=${job}`, config);

        dispatch({
            type: 'APPLICATION_DETAILS_SUCCESS',
            payload: data
        });
        
    } catch (error) {
        dispatch({
            type: 'APPLICATION_DETAILS_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const listApplication = (userId) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'APPLICATION_LIST_REQUEST' });

        const {
            userLogin: { userInfo }
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.get(`${baseURL}/applications/${userId}`, config);

        dispatch({
            type: 'APPLICATION_LIST_SUCCESS',
            payload: data
        });
        
    } catch (error) {
        dispatch({
            type: 'APPLICATION_LIST_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};