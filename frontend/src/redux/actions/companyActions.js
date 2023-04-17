import axios from 'axios';

export const listCompanies = () => async (dispatch) => {
    try {
        dispatch({ type: 'COMPANY_LIST_REQUEST' });

        const { data } = await axios.get('http://localhost:5000/api/companies');

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