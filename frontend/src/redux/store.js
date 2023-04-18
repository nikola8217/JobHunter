import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { 
    companyListReducer,
    companyDetailsReducer
} from './reducers/companyReducers';

const reducer = combineReducers({
    companyList: companyListReducer,
    companyDetails: companyDetailsReducer
});

const initialState = {};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;