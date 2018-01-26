import axios from 'axios';

export const Com = (id) => dispatch => {
    return axios.get('http://localhost:5000/comment/' + id)
        .then(response => {
            dispatch({ type: 'com', payload: response.data })
        });
}