import { FETCH_ALL,FETCH_POST, DELETE, CREATE, UPDATE,  SELECTED_POST, COMMENT} from "../constants/actionTypes";

export const postReducer = (state = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case FETCH_POST:
            return { ...state, post: action.payload}
        case CREATE:
            return [...state, action.payload];
        case UPDATE:
            return state.map((post) => post._id === action.payload._id ? action.payload : post);
        case DELETE:
            return state.filter((post) => post._id  !== action.payload);

            // comment section
        case COMMENT:
            return {
                ...state, posts: state.posts.map((post) => {
                    // changeb the post that just received a comment
                    if(post._id === action.payload._id) return action.payload;

                    return post
                    //return all the post normally
                })
            }

            default:
            return state;
    }
}

export const selectedPostReducer = (state = {}, action) =>{
    switch (action.type) {
        case SELECTED_POST:
            return {...state, ...action.payload};
        default:
            return state;
    }
}