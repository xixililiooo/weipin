import {createStore,applyMiddleware,compose}  from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
let store = createStore(reducer,compose(applyMiddleware(thunk),window.devToolsExtension?window.devToolsExtension():f=>f));
export default store;