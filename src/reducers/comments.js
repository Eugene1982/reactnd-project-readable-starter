import {
    GET_COMMENTS,
    ADD_COMMENT,
    DELETE_COMMENT,
    EDIT_COMMENT,
    VOTE_COMMENT_UP,
    VOTE_COMMENT_DOWN
} from '../utils/constants'

import _ from 'lodash'

export default function comments(state = [], action) {
    switch (action.type) {
        case GET_COMMENTS:
            return _.orderBy(action.comments, 'voteScore', 'desc')
        case DELETE_COMMENT:
            return state.filter((item) => item.id !== action.comment.id)
        case ADD_COMMENT:
            return [...state, action.comment]
        case EDIT_COMMENT:
            return state.map((item, index) => {
                if (item.id !== action.comment.id) {
                    return item
                }
                return { ...item, ...action.comment }
            })
        case VOTE_COMMENT_UP:
        case VOTE_COMMENT_DOWN:
            return _.orderBy(state.map((item, index) => {
                if (item.id !== action.comment.id) {
                    return item
                }
                item.voteScore = action.comment.voteScore
                return item
            }), 'voteScore', 'desc')
        default:
            return state
    }
}