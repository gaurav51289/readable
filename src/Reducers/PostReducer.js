import {
    FETCH_POSTS_SUCCESS,
    FILTER_POSTS
} from "../Actions/PostActions";

const allPosts = {
    posts: [],
    filterBy: 'all'
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

        default:
            return state;
    }
}