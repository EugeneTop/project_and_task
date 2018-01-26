import axios from 'axios';

export const getDevProj = (id) => dispatch => {
    return axios.get('http://localhost:5000/dev_proj/' + id)
        .then(response => {
            dispatch({ type: 'getDevProj', payload: response.data })
        });
}