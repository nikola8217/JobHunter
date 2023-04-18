export const companyListReducer = (state = { companies: [] }, action) => {
    switch (action.type) {
        case 'COMPANY_LIST_REQUEST':
            return { loading: true, companies: [] };
        case 'COMPANY_LIST_SUCCESS':
            return { loading: false, companies: action.payload };
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