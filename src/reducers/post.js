import {
    GET_POST,
    UPDATE_POST,
    DELETE_POST,
    VOTE_POST_UP,
    VOTE_POST_DOWN
} from '../utils/constants'

export default function post(state = {}, action) {
    switch (action.type) {
        case GET_POST:
        case UPDATE_POST:
        case VOTE_POST_UP:
        case VOTE_POST_DOWN:
            return action.post
        case DELETE_POST:
            return { isDeleted: true }
        default:
            return state
    }
}