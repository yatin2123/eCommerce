import { createStore, applyMiddleware } from "redux"
// import { rootReduce } from "./reducer"
import thunk from "redux-thunk"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootSaga from "./saga/rootSaga"
import createSagaMiddleware from 'redux-saga'
import { rootReduce } from "./reducer"
// import persistStore from "redux-persist/es/persistStore"

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'cart']
}

const persistedReducer = persistReducer(persistConfig, rootReduce)

const sagaMiddleware = createSagaMiddleware()

const middleware = [thunk, sagaMiddleware]

export const store = createStore(persistedReducer, applyMiddleware(...middleware));


export const persistor = persistStore(store)

sagaMiddleware.run(rootSaga)
