import axios from 'axios';

export const getDev= (id) => dispatch => {
    return axios.get('http://localhost:5000/all_dev')
        .then(response => {
            dispatch({ type: 'allDev', payload: response.data })
        });
}