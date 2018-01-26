const initialState = [];

export default function com(state = initialState, action) {
    if (action.type === 'com') {
        return action.payload;
    }
    return state;
}
