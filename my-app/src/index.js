import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux';
import allReducers from './reducers';
import { Provider } from 'react-redux';


//store
let store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

//action: function that returns an object
// const increment = function () {
//   return {
//     type: 'INCREMENT',
//   }
// }
// const decrement = function () {
//   return {
//     type: 'DECREMENT'
//   }
// }

//reducer: (state, action) => new_state
// const counter = function (state = 0, action) {
//   switch (action.type) {
//     case 'INCREMENT':
//       return state + 1;

//     case 'DECREMENT':
//       return state - 1;
//   }
// }





//dispatch
// store.dispatch(increment())
