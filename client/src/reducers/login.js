const initialState = [];

export default function postLogin(state = initialState, action) {
    if (action.type === 'postLogin') {
        return action.payload;
    }
    return state;
}
