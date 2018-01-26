const initialState = [];

export default function postUser(state = initialState, action) {
    if (action.type === 'postUser') {
        return action.payload;
    }
    return state;
}
