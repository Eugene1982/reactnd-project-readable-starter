import {
    GET_POSTS,
    ADD_POST,
    UPDATE_POST,
    DELETE_POST,
    VOTE_POST_UP,
    VOTE_POST_DOWN
} from '../utils/constants'

export default function posts(state = [], action) {
    switch (action.type) {
        case GET_POSTS:
            return action.posts
        case VOTE_POST_UP:
        case VOTE_POST_DOWN:
            return state.map((item, index) => {
                if (item.id !== action.post.id) {
                    return item
                }
                item.voteScore = action.post.voteScore
                return item
            })
        case ADD_POST:
            return [...state, action.post]
        case UPDATE_POST:
            return state.map((item, index) => {
                if (item.id !== action.post.id) {
                    return item
                }
                return { ...item, ...action.post }
            })
        case DELETE_POST:
            return state.filter((item) => item.id !== action.postId)
        default:
            return state
    }
}