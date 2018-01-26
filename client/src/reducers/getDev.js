const initialState = [];

export default function getDev(state = initialState, action) {
    if (action.type === 'getDev') {
        return [ ...state,
            action.payload
        ];
    }else if(action.type === 'getDevName') {
        return action.payload
    }
    return state;
}
