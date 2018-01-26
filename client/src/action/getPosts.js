import axios from 'axios';

export const getProjects = (id) => dispatch => {
    return axios.get('http://localhost:5000/getProjects/' + id)
        .then(response => {
            dispatch({ type: 'getProj', payload: response.data })
        });
}

export const getProjectDev = (id) => dispatch => {
    return axios.get('http://localhost:5000/getProjectsDev/' + id)
        .then(response => {
            dispatch({ type: 'getDevPost', payload: response.data })
        });
}