import axios from 'axios';

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({type: 'USER_LOGIN_REQUEST'});

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const { data } = await axios.post('http://localhost:5000/api/users/login', {email, password}, config);

        dispatch({
            type: 'USER_LOGIN_SUCCESS',
            payload: data
        });

        localStorage.setItem('userInfo', JSON.stringify(data));

    } catch (error) {
        dispatch({
            type: 'USER_LOGIN_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({type: 'USER_LOGOUT'});
};

export const register = (name, email, password, passConfirm) => async (dispatch) => {
    try {
        dispatch({type: 'USER_REGISTER_REQUEST'});

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const { data } = await axios.post('http://localhost:5000/api/users', {name, email, password, passConfirm}, config);

        dispatch({
            type: 'USER_REGISTER_SUCCESS',
            payload: data
        });

        // localStorage.setItem('userInfo', JSON.stringify(data));

    } catch (error) {
        dispatch({
            type: 'USER_REGISTER_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const listUsers = () => async (dispatch, getState) => {
    try {
        dispatch({ type: 'USER_LIST_REQUEST' });

        const {
            userLogin: { userInfo }
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.get('http://localhost:5000/api/users', config);

        dispatch({
            type: 'USER_LIST_SUCCESS',
            payload: data
        });
        
    } catch (error) {
        dispatch({
            type: 'USER_LIST_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'USER_DELETE_REQUEST' });

        const {
            userLogin: { userInfo }
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.delete(`http://localhost:5000/api/users/${id}`, config);

        dispatch({
            type: 'USER_DELETE_SUCCESS',
            payload: data
        });
        
    } catch (error) {
        dispatch({
            type: 'USER_DELETE_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const getUserById = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'USER_DETAILS_REQUEST' });

        const {
            userLogin: { userInfo }
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.get(`http://localhost:5000/api/users/${id}`, config);

        dispatch({
            type: 'USER_DETAILS_SUCCESS',
            payload: data
        });
        
    } catch (error) {
        dispatch({
            type: 'USER_DETAILS_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const updateUser = (user) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'USER_UPDATE_REQUEST' });

        const {
            userLogin: { userInfo }
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.put(`http://localhost:5000/api/users/${user._id}`, user, config);

        dispatch({
            type: 'USER_UPDATE_SUCCESS',
            payload: data
        });
        
    } catch (error) {
        dispatch({
            type: 'USER_UPDATE_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};