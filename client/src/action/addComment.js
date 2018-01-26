import axios from 'axios';

export const addCom = (id_dev, id_man, comment, id_task, name) => dispatch => {
    return axios.post('http://localhost:5000/add_post', {
        id_dev: id_dev,
        id_man: id_man,
        comment: comment,
        id_task:id_task,
        name: name
    })
        .then(response => {
            dispatch({ type: 'addCom', payload: response.data })
        });
}