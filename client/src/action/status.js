import axios from 'axios';

export const setStatus = (id, status) => dispatch => {
    return axios.post('http://localhost:5000/status', 
    {
        id: id,
        status: status
    },
    )
    .then(response => {
        dispatch({ type: 'setStatus', payload: response.data })
    });
}