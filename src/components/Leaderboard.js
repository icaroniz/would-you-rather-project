import React, {Component} from 'react';
import {connect} from "react-redux";
import styled from "styled-components";
import SectionTitle from "./SectionTitle";
import Avatar from "./Avatar";

const LeaderboardUser = styled.div`
  padding: 8px 16px;
  
  &:nth-child(odd) {
    background-color: #EEE;
  }
  
  &:not(:last-child) {
    border-bottom: 1px solid #666;
  }
  
  &.first {
    color: #FFD700;
    font-size: 2em;
    &::before {
      content: "#1 ";
    }
  }

  &.second {
    color: #ACAEC9;
    font-size: 1.8em;
    &::before {
      content: "#2 ";
    }
  }

  &.third {
    color: #CD7F32;
    font-size: 1.6em;
    &::before {
      content: "#3 ";
    }
  }
  
  > p {
    color: initial;
    font-size: initial;
  }
`;

class Leaderboard extends Component {
  compareUsers = (a, b) => {
    if (Object.keys(a.answers).length > Object.keys(b.answers).length) {
      return -1;
    } else if (Object.keys(a.answers).length < Object.keys(b.answers).length) {
      return 1;
    } else if (a.questions.length > b.questions.length) {
      return -1;
    } else if (a.questions.length < b.questions.length) {
      return 1;
    } else {
      return 0
    }
  }

  getClassName = (index) => {
    switch (index) {
      case 0:
        return 'first';
      case 1:
        return 'second';
      case 2:
        return 'third';
      default:
        return '';
    }
  }

  render() {
    return (
      <div>
        <SectionTitle>Leaderboard</SectionTitle>

        {this.props.users && Object.values(this.props.users).sort(this.compareUsers).map((user, index) =>
            <LeaderboardUser className={this.getClassName(index)} key={user.id} data-cy={'user'}>
              {user.name}
              <Avatar src={user.avatarURL} alt={user.name} data-cy={'user-img'} />
              <p>Voted questions:&nbsp;<span data-cy={'voted-questions'}>{Object.keys(user.answers).length}</span></p>
              <p>Created questions:&nbsp;<span data-cy={'questions-created'}>{user.questions.length}</span></p>
            </LeaderboardUser>
        )}
      </div>
    );
  }
}

function mapStateToProps({users}) {
  return {
    users,
  }
}

export default connect(mapStateToProps)(Leaderboard);
