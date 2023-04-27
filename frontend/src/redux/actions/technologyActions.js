import axios from 'axios';

export const listTechnologies = (name = '') => async (dispatch, getState) => {
    try {
        dispatch({ type: 'TECHNOLOGY_LIST_REQUEST' });

        const { data } = await axios.get(`http://localhost:5000/api/technologies?name=${name}`);

        dispatch({
            type: 'TECHNOLOGY_LIST_SUCCESS',
            payload: data
        });
        
    } catch (error) {
        dispatch({
            type: 'TECHNOLOGY_LIST_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const getTechnologyById = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'TECHNOLOGY_DETAILS_REQUEST' });

        const {
            userLogin: { userInfo }
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.get(`http://localhost:5000/api/technologies/${id}`, config);

        dispatch({
            type: 'TECHNOLOGY_DETAILS_SUCCESS',
            payload: data
        });
        
    } catch (error) {
        dispatch({
            type: 'TECHNOLOGY_DETAILS_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const deleteTechnology = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'TECHNOLOGY_DELETE_REQUEST' });

        const {
            userLogin: { userInfo }
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.delete(`http://localhost:5000/api/technologies/${id}`, config);

        dispatch({
            type: 'TECHNOLOGY_DELETE_SUCCESS',
            payload: data
        });
        
    } catch (error) {
        dispatch({
            type: 'TECHNOLOGY_DELETE_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const createTechnology = (technology) => async (dispatch, getState) => {
    try {
        dispatch({type: 'TECHNOLOGY_CREATE_REQUEST'});

        const {
            userLogin: { userInfo }
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.post('http://localhost:5000/api/technologies', technology, config);

        dispatch({
            type: 'TECHNOLOGY_CREATE_SUCCESS',
            payload: data
        });

        localStorage.setItem('userInfo', JSON.stringify(data));

    } catch (error) {
        dispatch({
            type: 'TECHNOLOGY_CREATE_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const updateTechnology = (technology) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'TECHNOLOGY_UPDATE_REQUEST' });

        const {
            userLogin: { userInfo }
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.put(`http://localhost:5000/api/technologies/${technology._id}`, technology, config);

        dispatch({
            type: 'TECHNOLOGY_UPDATE_SUCCESS',
            payload: data
        });
        
    } catch (error) {
        dispatch({
            type: 'TECHNOLOGY_UPDATE_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};