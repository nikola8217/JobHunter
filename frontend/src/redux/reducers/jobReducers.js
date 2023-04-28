export const jobListReducer = (state = { data: [] }, action) => {
    switch (action.type) {
        case 'JOB_LIST_REQUEST':
            return { loading: true, data: [] };
        case 'JOB_LIST_SUCCESS':
            return { loading: false, data: action.payload };
        case 'JOB_LIST_FAIL':
            return { loading: false, error: action.payload };
        default: 
            return state;
    }
};

export const jobDetailsReducer = (state = { job: {} }, action) => {
    switch (action.type) {
        case 'JOB_DETAILS_REQUEST':
            return { loading: true, ...state };
        case 'JOB_DETAILS_SUCCESS':
            return { loading: false, job: action.payload };
        case 'JOB_DETAILS_FAIL':
            return { loading: false, error: action.payload };
        default: 
            return state;
    }
};

export const jobDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case 'JOB_DELETE_REQUEST':
            return { loading: true };
        case 'JOB_DELETE_SUCCESS':
            return { loading: false, success: true };
        case 'JOB_DELETE_FAIL':
            return { loading: false, error: action.payload };
        default: 
            return state;
    }
};

export const jobCreateReducer = (state = { job: {} }, action) => {
    switch (action.type) {
        case 'JOB_CREATE_REQUEST':
            return { loading: true };
        case 'JOB_CREATE_SUCCESS':
            return { loading: false, success: true };
        case 'JOB_CREATE_FAIL':
            return { loading: false, error: action.payload };
            case 'JOB_CREATE_RESET':
                return {
                    job: {}
                }
        default: 
            return state;
    }
};

export const jobUpdateReducer = (state = { job: {} }, action) => {
    switch (action.type) {
        case 'JOB_UPDATE_REQUEST':
            return { loading: true };
        case 'JOB_UPDATE_SUCCESS':
            return { loading: false, success: true };
        case 'JOB_UPDATE_FAIL':
            return { loading: false, error: action.payload };
        case 'JOB_UPDATE_RESET':
            return {
                job: {}
            }
        default: 
            return state;
    }
};