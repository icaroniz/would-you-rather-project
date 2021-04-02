import {getInitialData, saveQuestion} from "../utils/api";
import {addAnsweredQuestion, addCreatedQuestion, receiveUsers} from "./users";
import {answerQuestion, createQuestion, receiveQuestions} from "./questions";

export function handleInitialData() {
  return (dispatch) => {
    return getInitialData().then(({users, questions}) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions))
    })
  }
}

export function handleAnswerQuestion(questionId, response) {
  return (dispatch, getState) => {
    const {authedUser} = getState();

    return Promise.all([
      dispatch(answerQuestion(authedUser, questionId, response)),
      dispatch(addAnsweredQuestion(authedUser, questionId, response)),
    ])
  }
}

export function handleCreateQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const {authedUser} = getState();

    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser,
    }).then((question) => Promise.all([
      dispatch(createQuestion(question)),
      dispatch(addCreatedQuestion(authedUser, question.id)),
    ]))
  }
}
