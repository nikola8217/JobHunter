import axios from 'axios';
import baseURL from '../config';

export const listLevels = (name = '') => async (dispatch, getState) => {
    try {
        dispatch({ type: 'LEVEL_LIST_REQUEST' });

        const { data } = await axios.get(`${baseURL}/levels?name=${name}`);

        dispatch({
            type: 'LEVEL_LIST_SUCCESS',
            payload: data
        });
        
    } catch (error) {
        dispatch({
            type: 'LEVEL_LIST_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const getLevelById = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'LEVEL_DETAILS_REQUEST' });

        const {
            userLogin: { userInfo }
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.get(`${baseURL}/levels/${id}`, config);

        dispatch({
            type: 'LEVEL_DETAILS_SUCCESS',
            payload: data
        });
        
    } catch (error) {
        dispatch({
            type: 'LEVEL_DETAILS_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const deleteLevel = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'LEVEL_DELETE_REQUEST' });

        const {
            userLogin: { userInfo }
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.delete(`${baseURL}/levels/${id}`, config);

        dispatch({
            type: 'LEVEL_DELETE_SUCCESS',
            payload: data
        });
        
    } catch (error) {
        dispatch({
            type: 'LEVEL_DELETE_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const createLevel = (level) => async (dispatch, getState) => {
    try {
        dispatch({type: 'LEVEL_CREATE_REQUEST'});

        const {
            userLogin: { userInfo }
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.post(`${baseURL}/levels`, level, config);

        dispatch({
            type: 'LEVEL_CREATE_SUCCESS',
            payload: data
        });

        localStorage.setItem('userInfo', JSON.stringify(data));

    } catch (error) {
        dispatch({
            type: 'LEVEL_CREATE_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const updateLevel = (level) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'LEVEL_UPDATE_REQUEST' });

        const {
            userLogin: { userInfo }
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.put(`${baseURL}/levels/${level._id}`, level, config);

        dispatch({
            type: 'LEVEL_UPDATE_SUCCESS',
            payload: data
        });
        
    } catch (error) {
        dispatch({
            type: 'LEVEL_UPDATE_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};