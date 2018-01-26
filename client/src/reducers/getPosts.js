const initialState = [];

export default function postProject(state = initialState, action) {
    if (action.type === 'getProj') {
        return action.payload;
    }else if(action.type === 'getDevPost'){
        return [
            ...state,
            action.payload
        ];
    }
    return state;
}
