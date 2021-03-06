import * as util from '../util/comment_api_util'
import { _setHeaders } from '../util/session_api_util'

import { receiveErrors, clearErrors } from './error_actions'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'

// async
export const fetchComments = (reminder_id) => {
  return (dispatch) => {
    return util.fetchComments(reminder_id).then(
      comments => dispatch(receiveComments(comments)),
      err => console.log("FetchComments error: ", err)
    )
  }
}

export const createComment = (comment, reminder_id) => {
  return (dispatch) => {
    return util.createComment({comment, reminder_id})
               .then(comment => {
                 dispatch(receiveComment(comment))
               })
  }
}

export const updateComment = (comment, reminder_id) => {
  return (dispatch) => {
    return util.updateComment({comment, reminder_id})
               .then(comment => {
                 dispatch(receiveComment(comment))
                 dispatch(clearErrors())
               },
                 err => {
                   dispatch(receiveErrors(err))
                 }
               )
  }
}

export const deleteComment = (comment, reminder_id) => {
  return (dispatch) => {
    return util.deleteComment({comment, reminder_id})
               .then(comment => { dispatch(removeComment(comment)) })
  }
}

// sync
export const receiveComment = comment => ({
  type: RECEIVE_COMMENT,
  comment
})

export const receiveComments = comments => ({
  type: RECEIVE_COMMENTS,
  comments
})

export const removeComment = comment => ({
  type: REMOVE_COMMENT,
  comment
})
