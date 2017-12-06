import {
    SHOW_COMMENTS_AMOUNT,
    ADD_COMMENT,
    DELETE_COMMENT
} from '../utils/constants'

export default function commentsAmount(state = [], action) {
    switch (action.type) {
        case SHOW_COMMENTS_AMOUNT:
            return state[action.postId] === undefined ?
                { ...state, [action.postId]: action.amount } : state
        case ADD_COMMENT:
            return { ...state, [action.comment.parentId]: state[action.comment.parentId] += 1 }
        case DELETE_COMMENT:
            return { ...state, [action.comment.parentId]: state[action.comment.parentId] -= 1 }
        default:
            return state
    }
}