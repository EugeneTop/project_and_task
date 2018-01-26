import axios from 'axios';

export const getTasks = (id) => dispatch => {
    return axios.get('http://localhost:5000/getTasks/' + id)
        .then(response => {
            dispatch({ type: 'getTasks', payload: response.data })
        });
}

export const getMyTasks = (id, id_dev) => dispatch => {
    return axios.get('http://localhost:5000/getTaskDev/'+ id +'/' + id_dev)
        .then(response => {
            dispatch({ type: 'getMyTasks', payload: response.data })
        });
}