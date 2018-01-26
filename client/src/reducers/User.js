const initialState = [];

export default function user(state = initialState, action) {
    if (action.type === 'User') {
        return action.payload;
    }
    return state;
}
