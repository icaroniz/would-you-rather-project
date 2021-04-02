import {_getUsers, _getQuestions, _saveQuestion} from "../tools/_DATA";

export function getInitialData() {
  return Promise.all([
    _getUsers(),
    _getQuestions(),
  ]).then(([users, questions]) => ({
    users,
    questions,
  }))
}

export function saveQuestion(info) {
  return _saveQuestion(info)
}
