import axios from 'axios';

export const postT = (id_project, description, name, developer_id) => dispatch => {
    return axios.post('http://localhost:5000/dev_task', {
        id_project: 1,
	    name: "sdzfcxd",
	    description: "fsdfsdf",
	    developer_id: 1
    })
        .then(response => {
            dispatch({ type: 'postT', payload: response.data })
        });
}