import React from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import {formatDate} from "../utils/helpers";

const QuestionRowStyled = styled.div`
  padding: 8px 16px;

  &:nth-child(odd) {
    background-color: #EEE;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #666;
  }
`;

class QuestionRow extends React.Component {
  render() {
    const {question, voted} = this.props;
    return (
      <QuestionRowStyled data-cy="question-row">
        <Link to={`/questions/${question.id}`}>
          <div>Would You Rather {question.optionOne.text} or {question.optionTwo.text}?</div>
        </Link>
        {voted ? (
          <div>Your vote: {question[voted].text}</div>
        ) : null}
        <div>Number of votes: {question.optionOne.votes.length + question.optionTwo.votes.length}</div>
        <div style={{fontSize: "small"}}>Created on {formatDate(question.timestamp)}</div>
      </QuestionRowStyled>
    );
  }
}

function mapStateToProps({authedUser, questions}, {id}) {
  const question = questions[id]

  return {
    question,
    voted: question.optionOne.votes.includes(authedUser) ? 'optionOne' : question.optionTwo.votes.includes(authedUser) ? 'optionTwo' : null,
  }
}

QuestionRow.propTypes = {
  question: PropTypes.object,
  voted: PropTypes.string,
}

export default connect(mapStateToProps)(QuestionRow);
