const initialState = [];

export default function allDev(state = initialState, action) {
    if (action.type === 'allDev') {
        return action.payload;
    }
    return state;
}
