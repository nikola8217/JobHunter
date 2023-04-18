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