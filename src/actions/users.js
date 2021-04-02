export const RECEIVE_USERS = 'RECEIVE_USERS';
export const ADD_ANSWERED_QUESTION = 'ADD_ANSWERED_QUESTION';
export const ADD_CREATED_QUESTION = 'ADD_CREATED_QUESTION';

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  }
}

export function addAnsweredQuestion(user, questionId, response) {
  return {
    type: ADD_ANSWERED_QUESTION,
    user,
    questionId,
    response,
  }
}

export function addCreatedQuestion(user, questionId) {
  return {
    type: ADD_CREATED_QUESTION,
    user,
    questionId,
  }
}
