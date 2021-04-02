import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import styled from "styled-components";
import {handleCreateQuestion} from "../actions/shared";
import SectionTitle from "./SectionTitle";
import PropTypes from "prop-types";
import Button from "./Button";

const FormFields = styled.fieldset`
  text-align: center;
  border: none;
  
  > p {
    display: block;
    margin: 0.5em auto;
  }
  > button {
    font-size: 1.2em;
    display: block;
    margin: 1em auto;
  }
`;

class CreateQuestion extends Component {
  state = {
    optionOne: '',
    optionTwo: '',
    redirect: false
  }

  handleOptionOneChange = (e) => {
    const optionOne = e.target.value

    this.setState(() => ({
      optionOne
    }))
  }

  handleOptionTwoChange = (e) => {
    const optionTwo = e.target.value

    this.setState(() => ({
      optionTwo
    }))
  }

  submitHandler = (e) => {
    e.preventDefault()

    const {optionOne, optionTwo} = this.state
    const {dispatch} = this.props

    // Save new poll
    dispatch(handleCreateQuestion(optionOne.trim(), optionTwo.trim()))

    this.setState(() => ({redirect: true}))
  }

  validateValues = () => {
    const {optionOne, optionTwo} = this.state

    return optionOne.trim() !== '' && optionTwo.trim() !== '' && optionOne.trim() !== optionTwo.trim()
  }

  render() {
    const {redirect, optionOne, optionTwo} = this.state;
    return (
      <>
        {redirect && <Redirect to="/"/>}

        <SectionTitle>New poll</SectionTitle>

        <form onSubmit={this.submitHandler}>
          <FormFields>
            <p>Would you rather</p>
            <input type="text" value={optionOne} onChange={this.handleOptionOneChange} data-cy="question-selection-one"/>
            <p>or</p>
            <input type="text" value={optionTwo} onChange={this.handleOptionTwoChange} data-cy="question-selection-two"/>

            <Button type="submit" disabled={!this.validateValues()}>Create poll</Button>
          </FormFields>
        </form>
      </>
    );
  }
}

CreateQuestion.propTypes = {
  dispatch: PropTypes.func,
}

export default connect()(CreateQuestion);
