const initialState = [];

export default function addCom(state = initialState, action) {
    if (action.type === 'addCom') {
        return action.payload;
    }
    return state;
}
