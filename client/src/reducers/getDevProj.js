const initialState = [];

export default function getDevProj(state = initialState, action) {
    if (action.type === 'getDevProj') {
        return action.payload
    }
    return state;
}


