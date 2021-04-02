export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';
export const CREATE_QUESTION = 'CREATE_QUESTION';

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

export function answerQuestion(user, questionId, response) {
  return {
    type: ANSWER_QUESTION,
    questionId,
    response,
    user,
  }
}

export function createQuestion(question) {
  return {
    type: CREATE_QUESTION,
    question,
  }
}
