const initialState = [];

export default function getTasks(state = initialState, action) {
    if (action.type === 'getTasks' || action.type === 'getMyTasks') {
        return action.payload;
    }
    return state;
}
