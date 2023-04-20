import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { 
    companyListReducer,
    companyDetailsReducer
} from './reducers/companyReducers';
import { 
    userLoginReducer,
    userRegisterReducer 
} from './reducers/userReducers';

const reducer = combineReducers({
    companyList: companyListReducer,
    companyDetails: companyDetailsReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const initialState = {
    userLogin: { userInfo: userInfoFromStorage }
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;