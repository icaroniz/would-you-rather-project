export function formatDate (timestamp) {
  const d = new Date(timestamp)
  const time = d.toLocaleTimeString('en-US')
  return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
}

export function hasUserVotedQuestion(user, question) {
  return user && question && (question.optionOne.votes.includes(user) || question.optionTwo.votes.includes(user))
}
