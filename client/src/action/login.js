import axios from 'axios';

export const postLogin = (status, login, password) => dispatch => {
    return axios.post('http://localhost:5000/login_' + status, 
    {
        login: login,
        password: password
    },
    )
    .then(response => {
        dispatch({ type: 'postLogin', payload: response.data })
    });
}