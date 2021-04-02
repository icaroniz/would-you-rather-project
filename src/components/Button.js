import styled from "styled-components";

const Button = styled.button`
  padding: 0.2em 0.5em;
  background-color: #0e375d;
  color: #FFF;
  border-radius: 0.2em;
  border: none;
  opacity: 0.6;
  
  &:hover {
    opacity: 1;
  }
  
  &:disabled {
    opacity: 0.1;
  }
`;

export default Button;