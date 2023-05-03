import axios from "axios";

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

        const { data } = await axios.post('http://localhost:5000/api/applications', application, config);

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

        const { data } = await axios.get(`http://localhost:5000/api/applications?user=${userId}&job=${job}`, config);

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