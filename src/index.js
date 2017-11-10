import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import thunkMiddleware from 'redux-thunk'
import { BrowserRouter } from 'react-router-dom'

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware)
)

ReactDOM.render(<BrowserRouter><Provider store={store}><App /></Provider></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
