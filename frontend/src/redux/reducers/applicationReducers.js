export const applicationCreateReducer = (state = { application: {} }, action) => {
    switch (action.type) {
        case 'APPLICATION_CREATE_REQUEST':
            return { loading: true };
        case 'APPLICATION_CREATE_SUCCESS':
            return { loading: false, success: true };
        case 'APPLICATION_CREATE_FAIL':
            return { loading: false, error: action.payload };
        case 'APPLICATION_CREATE_RESET':
            return {
                application: {}
            }
        default: 
            return state;
    }
};