import React, {Component} from "react";
import {connect} from "react-redux";
import styled from "styled-components";
import {setAuthedUser} from "../actions/authedUser";
import SectionTitle from "./SectionTitle";
import Button from "./Button";

const LoginFormStyled = styled.div`
  text-align: center;
  padding: .5em 1em;
  
  select {
    min-width: 120px;
  }
  
  button[type=submit] {
    font-size: 1.2em;
    display: block;
    margin: 1em auto;
  }
`;

class LoginForm extends Component {
  state = {
    id: ''
  };

  handleSubmit = (e) => {
    e.preventDefault()

    const {dispatch} = this.props
    const {id} = this.state

    dispatch(setAuthedUser(id))
  };

  handleChange = (e) => {
    const id = e.target.value

    this.setState(() => ({id}))
  };

  render() {
    const {id} = this.state;

    return (
      <LoginFormStyled>
        <SectionTitle>Login</SectionTitle>

        <form onSubmit={this.handleSubmit}>
          <label htmlFor="user-select">Log in as </label>
          <select id="user-select" value={id} onChange={this.handleChange} data-cy="user-select">
            <option value="" disabled>Select a user</option>
            {this.props.users && Object.values(this.props.users).map((user) =>
              <option value={user.id} key={user.id}>{user.name}</option>
            )}
          </select>
          {/*<input type="text" placeholder="User Name" />
          <input type="password" placeholder="Password" />*/}
          <Button type="submit" data-cy="log-in-button" disabled={!id}>Log in</Button>
        </form>
      </LoginFormStyled>
    );
  }
}

function mapStateToProps({users}) {
  return {
    users,
  }
}

export default connect(mapStateToProps)(LoginForm);
