import {ANSWER_QUESTION, CREATE_QUESTION, RECEIVE_QUESTIONS} from "../actions/questions";

export default function questions(state = null, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      }
    case CREATE_QUESTION:
      return {
        ...state,
        [action.question.id]: action.question,
      }
    case ANSWER_QUESTION:
      return {
        ...state,
        [action.questionId]: {
          ...state[action.questionId],
          [action.response]: {
            ...state[action.questionId][action.response],
            votes: [...state[action.questionId][action.response].votes, action.user],
          },
        },
      }
    default:
      return state;
  }
}
