import axios from 'axios';

export const listCompanies = (name = '') => async (dispatch) => {
    try {
        dispatch({ type: 'COMPANY_LIST_REQUEST' });

        const { data } = await axios.get(`http://localhost:5000/api/companies?name=${name}`);

        dispatch({
            type: 'COMPANY_LIST_SUCCESS',
            payload: data
        });
        
    } catch (error) {
        dispatch({
            type: 'COMPANY_LIST_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const getCompanyById = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'COMPANY_DETAILS_REQUEST' });

        const { data } = await axios.get(`http://localhost:5000/api/companies/${id}`);

        dispatch({
            type: 'COMPANY_DETAILS_SUCCESS',
            payload: data
        });
        
    } catch (error) {
        dispatch({
            type: 'COMPANY_DETAILS_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const deleteCompany = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'COMPANY_DELETE_REQUEST' });

        const {
            userLogin: { userInfo }
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.delete(`http://localhost:5000/api/companies/${id}`, config);

        dispatch({
            type: 'COMPANY_DELETE_SUCCESS',
            payload: data
        });
        
    } catch (error) {
        dispatch({
            type: 'COMPANY_DELETE_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const createCompany = (company) => async (dispatch, getState) => {
    try {
        dispatch({type: 'COMPANY_CREATE_REQUEST'});

        const {
            userLogin: { userInfo }
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.post('http://localhost:5000/api/companies', company, config);

        dispatch({
            type: 'COMPANY_CREATE_SUCCESS',
            payload: data
        });

        localStorage.setItem('userInfo', JSON.stringify(data));

    } catch (error) {
        dispatch({
            type: 'COMPANY_CREATE_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const updateCompany = (company) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'COMPANY_UPDATE_REQUEST' });

        const {
            userLogin: { userInfo }
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.put(`http://localhost:5000/api/companies/${company._id}`, company, config);

        dispatch({
            type: 'COMPANY_UPDATE_SUCCESS',
            payload: data
        });
        
    } catch (error) {
        dispatch({
            type: 'COMPANY_UPDATE_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};