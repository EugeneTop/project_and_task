import axios from 'axios';

export const getDev= (id) => dispatch => {
    return axios.get('http://localhost:5000/getProjects/' + id)
        .then(response => {
            dispatch({ type: 'getDev', payload: response.data })
        });
}

export const getDevName= (name) => dispatch => {
    return axios.get('http://localhost:5000/dev_name/' + name)
        .then(response => {
            dispatch({ type: 'getDevName', payload: response.data })
        });
}