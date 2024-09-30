import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './user/sagas';
import { reducers } from './user/reducers';
import { composeWithDevTools } from '@redux-devtools/extension';

const sagaMiddleware = createSagaMiddleware();
const enhancer = composeWithDevTools(applyMiddleware(sagaMiddleware));
const store = createStore(reducers, enhancer);
sagaMiddleware.run(rootSaga);

export {
    store, sagaMiddleware
}  