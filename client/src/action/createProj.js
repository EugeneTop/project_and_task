import axios from 'axios';

export const postProject = (name, description, id_manager) => dispatch => {
    return axios.post('http://localhost:5000/addPost', {
        name: name,
        description: description,
        id_manager: 1
    })
        .then(response => {
            dispatch({ type: 'postProj', payload: response.data })
        });
}