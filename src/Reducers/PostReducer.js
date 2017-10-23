import {
    FETCH_POSTS_SUCCESS,
    FILTER_POSTS,
    SORT_POSTS,
    ADD_POST, DELETE_POST
} from "../Actions/PostActions";

const allPosts = {
    posts: [],
    filterBy: 'all',
    sortBy: 'votes'
};


export function filteredPosts(state = allPosts, action) {
    switch (action.type) {
        case FETCH_POSTS_SUCCESS:
            return {
                ...state,
                posts: action.posts
            };

        case FILTER_POSTS:
            return {
                ...state,
                filterBy: action.category
            };

        case SORT_POSTS:
            return {
                ...state,
                sortBy: action.sort
            };

        case ADD_POST:
            return{
                ...state,
                posts: state.posts.concat(action.post)
            };
        case DELETE_POST:
            return{
                ...state,
                posts: state.posts.filter((post) => !(post.id === action.postId))
            };
        default:
            return state;
    }
}