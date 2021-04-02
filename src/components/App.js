import React, {Component} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, NavLink, Route, Switch} from 'react-router-dom';
import styled from "styled-components";
import {handleInitialData} from "../actions/shared";
import {unsetAuthedUser} from "../actions/authedUser";
import LoginForm from "./LoginForm";
import Questions from "./Questions";
import Question from "./Question";
import Leaderboard from "./Leaderboard";
import CreateQuestion from "./CreateQuestion";
import NotFound from "./NotFound";
import PropTypes from "prop-types";
import Button from "./Button";

const AppHeader = styled.header`
  box-shadow: 0 3px 3px #666;
`;

const AppTitle = styled.h1`
  text-align: center;
  font-family: "Open Sans", Arial, sans-serif;
  margin: 0 auto;
  padding: 0.5em 1em;
  background-color: #4ab3ff;
`;

const LoggedInformation = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: block;
  margin: 0 auto;
  padding: 0.5em 1em;
  text-align: center;
  font-size: small;
  background-color: #DADADA;
  box-shadow: 0 -3px 3px #666;
`;

const NavigationLinks = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
`
const NavigationLink = styled(NavLink)`
  margin: 0.5em 1em;
`

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  handleLogout = (e) => {
    e.preventDefault()

    const {dispatch} = this.props

    dispatch(unsetAuthedUser())
  }

  render() {
    const {isUserLogged, authedUser} = this.props;

    return (
      <Router>
        <AppHeader>
          <AppTitle>Would You Rather...?</AppTitle>
          {isUserLogged && (
            <NavigationLinks>
              <NavigationLink activeStyle={{display: "none"}} exact to={`/`}>Home</NavigationLink>
              <NavigationLink activeStyle={{display: "none"}} exact to={`/leaderboard`}>Leaderboard</NavigationLink>
              <NavigationLink activeStyle={{display: "none"}} exact to={`/add`}>Add poll</NavigationLink>
            </NavigationLinks>
          )}
        </AppHeader>
        <main>
          {isUserLogged ? (
            <Switch>
              <Route path="/" exact component={Questions}/>
              <Route path="/questions/:id" component={Question}/>
              <Route path="/leaderboard" component={Leaderboard}/>
              <Route path="/add" component={CreateQuestion}/>
              <Route path="*" component={NotFound}/>
            </Switch>
          ) : (
            <LoginForm/>
          )}
        </main>
        {isUserLogged && (
          <LoggedInformation>
            Logged in as {authedUser.name}&nbsp;
            <Button data-cy="log-out-button" onClick={this.handleLogout}>Log out</Button>
          </LoggedInformation>
        )}
      </Router>
    );
  }
}

function mapStateToProps({users, authedUser}) {
  return {
    isUserLogged: !!authedUser,
    authedUser: authedUser ? users[authedUser] : null
  }
}

App.propTypes = {
  dispatch: PropTypes.func,
  isUserLogged: PropTypes.bool,
  authedUser: PropTypes.string,
}

export default connect(mapStateToProps)(App);
