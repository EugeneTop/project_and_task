const initialState = [];

export default function postProject(state = initialState, action) {
    if (action.type === 'postProj') {
        return action.payload;
    }
    return state;
}
