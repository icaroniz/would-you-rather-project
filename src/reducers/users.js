import {ADD_ANSWERED_QUESTION, ADD_CREATED_QUESTION, RECEIVE_USERS} from "../actions/users";

export default function users(state = null, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      }
    case ADD_ANSWERED_QUESTION:
      return {
        ...state,
        [action.user]: {
          ...state[action.user],
          answers: {
            ...state[action.user].answers,
            [action.questionId]: action.response,
          }
        }
      }
    case ADD_CREATED_QUESTION:
      return {
        ...state,
        [action.user]: {
          ...state[action.user],
          questions: [
            ...state[action.user].questions,
            action.questionId,
          ]
        }
      }
    default:
      return state
  }
}
