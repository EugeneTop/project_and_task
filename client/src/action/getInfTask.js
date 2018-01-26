import axios from 'axios';

export const getTask = (id) => dispatch => {
    return axios.get('http://localhost:5000/get_task/' + id)
        .then(response => {
            dispatch({ type: 'getTask', payload: response.data })
        });
}