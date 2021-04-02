import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {hasUserVotedQuestion} from "../utils/helpers";
import QuestionRow from "./QuestionRow";
import styled from "styled-components";

const QuestionsTabs = styled.div`
  display: flex;
  background-color: #BBB;
  padding: 0.2em 0.2em 0;
  margin: 0.2em 0;
`;
const QuestionsTab = styled.div`
  flex-grow: 1;
  font-weight: bold;
  text-align: center;
  border-top-right-radius: 0.2em;
  border-top-left-radius: 0.2em;
  padding: 0.5em 1em;
  opacity: 0.8;

  background-color: #BBB;

  cursor: pointer;

  &.active {
    background-color: #FFF;
    color: #000;
    opacity: 1;
  }
`;

class Questions extends Component {
  state = {
    showVoted: false
  }

  showVotedQuestions = () => {
    this.setState(() => ({
      showVoted: true
    }));
  }

  showNotVotedQuestions = () => {
    this.setState(() => ({
      showVoted: false
    }));
  }

  render() {
    const {showVoted} = this.state;
    return (
      <div>
        <QuestionsTabs>
          <QuestionsTab onClick={this.showVotedQuestions} className={showVoted ? "active" : null}
                        data-cy="voted-tab">Voted</QuestionsTab>
          <QuestionsTab onClick={this.showNotVotedQuestions} className={!showVoted ? "active" : null}
                        data-cy="not-voted-tab">Not Voted</QuestionsTab>
        </QuestionsTabs>
        {(showVoted ? this.props.questionsVotedIds : this.props.questionsNotVotedIds).map((id) => (
          <QuestionRow key={id} id={id}/>
        ))}
      </div>
    );
  }

}

function mapStateToProps({authedUser, questions}) {
  return {
    questionsVotedIds: Object.keys(questions)
      .filter(qid => hasUserVotedQuestion(authedUser, questions[qid]))
      .sort((qa, qb) => questions[qb].timestamp - questions[qa].timestamp),
    questionsNotVotedIds: Object.keys(questions)
      .filter(qid => !hasUserVotedQuestion(authedUser, questions[qid]))
      .sort((qa, qb) => questions[qb].timestamp - questions[qa].timestamp),
  }
}

Questions.propTypes = {
  questionsVotedIds: PropTypes.arrayOf(PropTypes.string),
  questionsNotVotedIds: PropTypes.arrayOf(PropTypes.string),
}

export default connect(mapStateToProps)(Questions);
