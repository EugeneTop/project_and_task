import axios from 'axios';

export const getUser = () => dispatch => {
    return axios.get('http://localhost:5000/getUser')
        .then(response => {
            dispatch({ type: 'User', payload: response.data })
        });
}