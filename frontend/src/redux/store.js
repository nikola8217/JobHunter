import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { 
    companyListReducer,
    companyDetailsReducer,
    companyDeleteReducer,
    companyCreateReducer,
    companyUpdateReducer
} from './reducers/companyReducers';
import { 
    userLoginReducer,
    userRegisterReducer,
    userListReducer,
    userDeleteReducer,
    userDetailsReducer,
    userUpdateReducer
} from './reducers/userReducers';

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userDetails: userDetailsReducer,
    userUpdate: userUpdateReducer,
    companyList: companyListReducer,
    companyDetails: companyDetailsReducer,
    companyDelete: companyDeleteReducer,
    companyCreate: companyCreateReducer,
    companyUpdate: companyUpdateReducer
});

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const initialState = {
    userLogin: { userInfo: userInfoFromStorage }
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;