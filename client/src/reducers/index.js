import { combineReducers } from 'redux';

import user from './User';
import postUser from './Post_user';
import postProject from './createProj';
import getPosts from './getPosts';
import postLogin from './login';
import getTasks from './getTasks';
import getDev from './getDev';
import getDevProj from './getDevProj';
import getTask from './getInfTask';
import addCom from './addComment';
import com from './comment';
import postT from './createT';
import status from './status';
import allDev from './allDev';
import addProj from './getPro';

export default combineReducers({
    user,
    postUser,
    postProject,
    getPosts,
    postLogin,
    getTasks,
    getDev,
    getDevProj,
    getTask,
    addCom,
    com,
    postT,
    status, 
    allDev,
    addProj
});
