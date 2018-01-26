const initialState = [];

export default function getProj(state = initialState, action) {
    if (action.type === 'addProj') {
        return action.payload;
    }
    return state;
}
