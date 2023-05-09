import axios from 'axios';
import baseURL from '../config';

export const listJobs = (company = '', technology = '', level = '') => async (dispatch) => {
    try {
        
        dispatch({ type: 'JOB_LIST_REQUEST' });

        const { data } = await axios.get(`${baseURL}/jobs?company=${company}&technology=${technology}&level=${level}`);

        dispatch({
            type: 'JOB_LIST_SUCCESS',
            payload: data
        });
        
    } catch (error) {
        dispatch({
            type: 'JOB_LIST_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const getJobById = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'JOB_DETAILS_REQUEST' });

        const { data } = await axios.get(`${baseURL}/jobs/${id}`);

        dispatch({
            type: 'JOB_DETAILS_SUCCESS',
            payload: data
        });
        
    } catch (error) {
        dispatch({
            type: 'JOB_DETAILS_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const deleteJob = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'JOB_DELETE_REQUEST' });

        const {
            userLogin: { userInfo }
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.delete(`${baseURL}/jobs/${id}`, config);

        dispatch({
            type: 'JOB_DELETE_SUCCESS',
            payload: data
        });
        
    } catch (error) {
        dispatch({
            type: 'JOB_DELETE_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const createJob = (job) => async (dispatch, getState) => {
    try {
        dispatch({type: 'JOB_CREATE_REQUEST'});

        const {
            userLogin: { userInfo }
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.post(`${baseURL}/jobs`, job, config);

        dispatch({
            type: 'JOB_CREATE_SUCCESS',
            payload: data
        });

        localStorage.setItem('userInfo', JSON.stringify(data));

    } catch (error) {
        dispatch({
            type: 'JOB_CREATE_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const updateJob = (job) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'JOB_UPDATE_REQUEST' });

        const {
            userLogin: { userInfo }
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.put(`${baseURL}/jobs/${job._id}`, job, config);

        dispatch({
            type: 'JOB_UPDATE_SUCCESS',
            payload: data
        });
        
    } catch (error) {
        dispatch({
            type: 'JOB_UPDATE_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};