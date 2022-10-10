import { createStore } from 'redux';
import saveCredentialsReducer from './Reducers/index.js';


const store = createStore(saveCredentialsReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


export default store;
