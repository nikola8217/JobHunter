export const levelListReducer = (state = { data: [] }, action) => {
    switch (action.type) {
        case 'LEVEL_LIST_REQUEST':
            return { loading: true, data: [] };
        case 'LEVEL_LIST_SUCCESS':
            return { loading: false, data: action.payload };
        case 'LEVEL_LIST_FAIL':
            return { loading: false, error: action.payload };
        default: 
            return state;
    }
};

export const levelDetailsReducer = (state = { level: {} }, action) => {
    switch (action.type) {
        case 'LEVEL_DETAILS_REQUEST':
            return { loading: true, ...state };
        case 'LEVEL_DETAILS_SUCCESS':
            return { loading: false, level: action.payload };
        case 'LEVEL_DETAILS_FAIL':
            return { loading: false, error: action.payload };
        default: 
            return state;
    }
};

export const levelDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case 'LEVEL_DELETE_REQUEST':
            return { loading: true };
        case 'LEVEL_DELETE_SUCCESS':
            return { loading: false, success: true };
        case 'LEVEL_DELETE_FAIL':
            return { loading: false, error: action.payload };
        default: 
            return state;
    }
};

export const levelCreateReducer = (state = { level: {} }, action) => {
    switch (action.type) {
        case 'LEVEL_CREATE_REQUEST':
            return { loading: true };
        case 'LEVEL_CREATE_SUCCESS':
            return { loading: false, success: true };
        case 'LEVEL_CREATE_FAIL':
            return { loading: false, error: action.payload };
            case 'LEVEL_CREATE_RESET':
                return {
                    level: {}
                }
        default: 
            return state;
    }
};

export const levelUpdateReducer = (state = { level: {} }, action) => {
    switch (action.type) {
        case 'LEVEL_UPDATE_REQUEST':
            return { loading: true };
        case 'LEVEL_UPDATE_SUCCESS':
            return { loading: false, success: true };
        case 'LEVEL_UPDATE_FAIL':
            return { loading: false, error: action.payload };
        case 'LEVEL_UPDATE_RESET':
            return {
                level: {}
            }
        default: 
            return state;
    }
};