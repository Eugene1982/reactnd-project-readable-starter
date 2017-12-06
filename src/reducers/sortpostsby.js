import {
    BY_VOTE_SCORE,
    SORT_POSTS
} from '../utils/constants'

export default function sortPostsBy(state = BY_VOTE_SCORE, action) {
    switch (action.type) {
        case SORT_POSTS:
            return action.sortBy
        default:
            return state
    }
}
