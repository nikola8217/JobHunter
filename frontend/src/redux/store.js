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
import { 
    technologyListReducer,
    technologyDetailsReducer,
    technologyDeleteReducer,
    technologyCreateReducer,
    technologyUpdateReducer
} from './reducers/technologiesReducers';
import { 
    levelListReducer,
    levelDetailsReducer,
    levelDeleteReducer,
    levelCreateReducer,
    levelUpdateReducer 
} from './reducers/levelReducers';
import {
    jobListReducer,
    jobDetailsReducer,
    jobDeleteReducer,
    jobCreateReducer,
    jobUpdateReducer
} from './reducers/jobReducers';
import {
    applicationCreateReducer,
    applicationDetailsReducer
} from './reducers/applicationReducers';

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
    companyUpdate: companyUpdateReducer,
    technologyDetails: technologyDetailsReducer,
    technologyList: technologyListReducer,
    technologyDelete: technologyDeleteReducer,
    technologyCreate: technologyCreateReducer,
    technologyUpdate: technologyUpdateReducer,
    levelDetails: levelDetailsReducer,
    levelList: levelListReducer,
    levelDelete: levelDeleteReducer,
    levelCreate: levelCreateReducer,
    levelUpdate: levelUpdateReducer,
    jobList: jobListReducer,
    jobDetails: jobDetailsReducer,
    jobDelete: jobDeleteReducer,
    jobCreate: jobCreateReducer,
    jobUpdate: jobUpdateReducer,
    applicationCreate: applicationCreateReducer,
    applicationCheck: applicationDetailsReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const initialState = {
    userLogin: { userInfo: userInfoFromStorage }
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;