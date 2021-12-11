import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { applyMiddleware, createStore } from 'redux';
import thunk from "redux-thunk"
import { Provider } from 'react-redux'
import rootReducer from './store/reducers/rootReducer'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { PersistGate } from 'redux-persist/integration/react'


const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(
  persistedReducer,
  {},
  applyMiddleware(thunk)
);

const persistor = persistStore(store)

ReactDOM.render(
  <PersistGate loading={null} persistor={persistor}>
    <Provider store = {store}>
      <App />
    </Provider>
  </PersistGate>,
  document.getElementById('root')
);

