import projectReducer from "./projectReducer";

const initState = {
    q: ''
}

const searchReducer = (state = initState, action) => {
    switch(action.type){
        case 'SEARCH_TODO':
            console.log('Searching for... ' + action.val);
            return{
                ...state,
                q: action.val
            }
        default:
            return state;
    }
}

export default searchReducer;