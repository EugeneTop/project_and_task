import axios from 'axios';

export const addPro = (name, id_dev, id_proj) => dispatch => {
    return axios.post('http://localhost:5000/addPost', {
        name: name,
        id_dev: id_dev,
        id_proj: id_proj
    })
        .then(response => {
            dispatch({ type: 'addProj', payload: response.data })
        });
}