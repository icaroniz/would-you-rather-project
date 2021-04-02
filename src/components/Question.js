import React from 'react';
import {connect} from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";
import {handleAnswerQuestion} from "../actions/shared";
import SectionTitle from "./SectionTitle";
import Avatar from "./Avatar";
import NotFound from "./NotFound";
import Button from "./Button";

const QuestionOptions = styled.div`
  display: flex;
  align-content: stretch;
  width: 100%;
`;
const QuestionOption = styled.div`
  flex-grow: 1;
  text-align: center;
  padding: 2em;
  border: 2px solid transparent;

  &:hover {
    border-color: darkblue;
  }

  &.voted {
    &:hover {
      border-color: transparent
    }

    &.voted-option,
    &.voted-option:hover {
      border-color: darkblue;
    }
  }
  
  button {
    opacity: 1;
  }
`;

const QuestionAuthor = styled.p`
  text-align: center;
  font-size: 0.8em;
`

class Question extends React.Component {
  state = {
    selected: null
  };

  selectOption = (e) => {
    const selectedOption = e.target.value;

    const {dispatch, question} = this.props;

    dispatch(handleAnswerQuestion(question.id, selectedOption))
  }

  render() {
    const {question, questionAuthor, voted} = this.props;
    const totalVotes = question ? question.optionOne.votes.length + question.optionTwo.votes.length : 0;

    return question ? (
      <>
        <SectionTitle>Would you rather...</SectionTitle>

        <QuestionOptions>
          <QuestionOption className={[!!voted && 'voted', voted === 1 && 'voted-option']} data-cy="question-option">
            {voted ? (
              <p>{question.optionOne.text}?{voted === 1 && <span className="voted-check">✔</span>}</p>
            ) : (
              <Button className="select-option-button" disabled={!!voted} onClick={this.selectOption} value={'optionOne'}>
                {question.optionOne.text}?{voted === 1 && <span className="voted-check">✔</span>}
              </Button>
            )}
            <p style={{fontSize: 'small'}}>{question.optionOne.votes.length} people voted
              ({Math.round(totalVotes === 0 ? 0 : (question.optionOne.votes.length / totalVotes * 100))}%)</p>
          </QuestionOption>
          <QuestionOption className={[!!voted && 'voted', voted === 2 && 'voted-option']} data-cy="question-option">
            {voted ? (
              <p>{question.optionTwo.text}?{voted === 2 && <span className="voted-check">✔</span>}</p>
            ) : (
              <Button className="select-option-button" onClick={this.selectOption} value={'optionTwo'}>
                {question.optionTwo.text}?{voted === 2 && <span className="voted-check">✔</span>}
              </Button>
            )}
            <p style={{fontSize: 'small'}}>{question.optionTwo.votes.length} people voted
              ({Math.round(totalVotes === 0 ? 0 : (question.optionTwo.votes.length / totalVotes * 100))}%)</p>
          </QuestionOption>
        </QuestionOptions>

        <QuestionAuthor>
          <Avatar data-cy="creator-image" src={questionAuthor.avatarURL}/>
          Created by {questionAuthor.name}
        </QuestionAuthor>
      </>
    ) : <NotFound/>;
  }
}

function mapStateToProps({users, authedUser, questions}, props) {
  const {id} = props.match.params
  const question = questions[id] ? questions[id] : null

  return {
    question,
    questionAuthor: question && users[question.author],
    voted: question && (question.optionOne.votes.includes(authedUser) ? 1 : question.optionTwo.votes.includes(authedUser) ? 2 : 0),
  }
}

Question.propTypes = {
  dispatch: PropTypes.func,
  question: PropTypes.object,
  questionAuthor: PropTypes.string,
  voted: PropTypes.oneOf([0, 1, 2]),
}

export default connect(mapStateToProps)(Question);
