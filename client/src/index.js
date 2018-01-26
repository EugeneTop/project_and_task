import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Route} from 'react-router-dom'; 
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import {composeWithDevTools} from 'redux-devtools-extension';
import registration from './registration';
import login from './login';
import reg from './reg';
import projects from './projects';
import tasks from './tasks';
import task from './task';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/" component={App}/>
        <Route path="/registration" component={registration}/>
        <Route path="/login" component={login}/>
        <Route path="/reg" component={reg}/>
        <Route path="/projects" component={projects}/>
        <Route path="/tasks" component={tasks}/>
        <Route path="/task" component={task}/>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
