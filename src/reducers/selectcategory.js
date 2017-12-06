import { GET_POSTS_BY_CATEGORY } from '../utils/constants'

export default function selectCategory(state = {}, action) {
    switch (action.type) {
        case GET_POSTS_BY_CATEGORY:
            return action.category
        default:
            return state
    }
}