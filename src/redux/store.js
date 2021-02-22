import {createStore,combineReducers,applyMiddleware} from 'redux';
import {pageStore,detailStore,searchStore} from '../redux/reducer/page-reducer';
import logger from 'redux-logger';

let rootReducer = combineReducers({ pageStore,detailStore,searchStore });

const Store = createStore(rootReducer,applyMiddleware(logger));

export default Store;