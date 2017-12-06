import { GET_CATEGORIES } from '../utils/constants'

export default function categories(state = [], action) {
    switch (action.type) {
        case GET_CATEGORIES:
            return action.categories
        default:
            return state
    }
}