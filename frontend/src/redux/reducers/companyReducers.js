export const companyListReducer = (state = { data: [] }, action) => {
    switch (action.type) {
        case 'COMPANY_LIST_REQUEST':
            return { loading: true, data: [] };
        case 'COMPANY_LIST_SUCCESS':
            return { loading: false, data: action.payload };
        case 'COMPANY_LIST_FAIL':
            return { loading: false, error: action.payload };
        default: 
            return state;
    }
};

export const companyDetailsReducer = (state = { company: {} }, action) => {
    switch (action.type) {
        case 'COMPANY_DETAILS_REQUEST':
            return { loading: true, ...state };
        case 'COMPANY_DETAILS_SUCCESS':
            return { loading: false, company: action.payload };
        case 'COMPANY_DETAILS_FAIL':
            return { loading: false, error: action.payload };
        default: 
            return state;
    }
};

export const companyDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case 'COMPANY_DELETE_REQUEST':
            return { loading: true };
        case 'COMPANY_DELETE_SUCCESS':
            return { loading: false, success: true };
        case 'COMPANY_DELETE_FAIL':
            return { loading: false, error: action.payload };
        default: 
            return state;
    }
};

export const companyCreateReducer = (state = { company: {} }, action) => {
    switch (action.type) {
        case 'COMPANY_CREATE_REQUEST':
            return { loading: true };
        case 'COMPANY_CREATE_SUCCESS':
            return { loading: false, success: true };
        case 'COMPANY_CREATE_FAIL':
            return { loading: false, error: action.payload };
            case 'COMPANY_CREATE_RESET':
                return {
                    company: {}
                }
        default: 
            return state;
    }
};

export const companyUpdateReducer = (state = { company: {} }, action) => {
    switch (action.type) {
        case 'COMPANY_UPDATE_REQUEST':
            return { loading: true };
        case 'COMPANY_UPDATE_SUCCESS':
            return { loading: false, success: true };
        case 'COMPANY_UPDATE_FAIL':
            return { loading: false, error: action.payload };
        case 'COMPANY_UPDATE_RESET':
            return {
                company: {}
            }
        default: 
            return state;
    }
};