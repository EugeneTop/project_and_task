const initialState = [];

export default function status(state = initialState, action) {
    if (action.type === 'setStatus') {
        return action.payload;
    }
    return state;
}
