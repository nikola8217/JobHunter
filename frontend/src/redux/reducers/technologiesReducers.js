export const technologyListReducer = (state = { data: [] }, action) => {
    switch (action.type) {
        case 'TECHNOLOGY_LIST_REQUEST':
            return { loading: true, data: [] };
        case 'TECHNOLOGY_LIST_SUCCESS':
            return { loading: false, data: action.payload };
        case 'TECHNOLOGY_LIST_FAIL':
            return { loading: false, error: action.payload };
        default: 
            return state;
    }
};

export const technologyDetailsReducer = (state = { technology: {} }, action) => {
    switch (action.type) {
        case 'TECHNOLOGY_DETAILS_REQUEST':
            return { loading: true, ...state };
        case 'TECHNOLOGY_DETAILS_SUCCESS':
            return { loading: false, technology: action.payload };
        case 'TECHNOLOGY_DETAILS_FAIL':
            return { loading: false, error: action.payload };
        default: 
            return state;
    }
};

export const technologyDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case 'TECHNOLOGY_DELETE_REQUEST':
            return { loading: true };
        case 'TECHNOLOGY_DELETE_SUCCESS':
            return { loading: false, success: true };
        case 'TECHNOLOGY_DELETE_FAIL':
            return { loading: false, error: action.payload };
        default: 
            return state;
    }
};

export const technologyCreateReducer = (state = { technology: {} }, action) => {
    switch (action.type) {
        case 'TECHNOLOGY_CREATE_REQUEST':
            return { loading: true };
        case 'TECHNOLOGY_CREATE_SUCCESS':
            return { loading: false, success: true };
        case 'TECHNOLOGY_CREATE_FAIL':
            return { loading: false, error: action.payload };
            case 'TECHNOLOGY_CREATE_RESET':
                return {
                    technology: {}
                }
        default: 
            return state;
    }
};

export const technologyUpdateReducer = (state = { technology: {} }, action) => {
    switch (action.type) {
        case 'TECHNOLOGY_UPDATE_REQUEST':
            return { loading: true };
        case 'TECHNOLOGY_UPDATE_SUCCESS':
            return { loading: false, success: true };
        case 'TECHNOLOGY_UPDATE_FAIL':
            return { loading: false, error: action.payload };
        case 'TECHNOLOGY_UPDATE_RESET':
            return {
                technology: {}
            }
        default: 
            return state;
    }
};