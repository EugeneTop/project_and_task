import axios from 'axios';

export const postUser = (status, login, password, email) => dispatch => {
    return axios.get('http://localhost:5000/test_login_' + status + '/' + login)
        .then(response => {
            if(response.data !== "This login exist"){
                axios.get('http://localhost:5000/test_email_' + status + '/' + email)
                    .then(response => {
                        if(response.data !== "This mail exist"){
                            axios.post('http://localhost:5000/registration_' + status, {
                                login: login,
                                password: password,
                                email: email
                            })
                            .then(response => {
                                dispatch({ type: 'postUser', payload: "OK" })
                            });
                        }else{
                            dispatch({ type: 'postUser', payload: "This mail exist" })
                        }
                    })
            }else{
                dispatch({ type: 'postUser', payload: "This login exist" })
            }
        })
}