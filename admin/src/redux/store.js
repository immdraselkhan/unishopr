import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducers';

// const store = createStore(
//     rootReducer,
//     applyMiddleware(thunk.withExtraArgument()),
// );
const initialState = {};
const middleware = [thunk];
const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
    // compose(
    //     applyMiddleware(...middleware),
    //     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    // )
);

export default store;
