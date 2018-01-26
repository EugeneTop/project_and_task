const initialState = [];

export default function getTask(state = initialState, action) {
    if (action.type === 'getTask') {
        return action.payload
    }
    return state;
}


