const initialState = [];

export default function postT(state = initialState, action) {
    if (action.type === 'postT') {
        return action.payload;
    }
    return state;
}
