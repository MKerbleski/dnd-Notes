import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import List from './Components';
import styled from 'styled-components';

class App extends Component {
  render() {
    return (
      <AppDiv>
        <h1>dnd-Notes</h1>
        <List />
      </AppDiv>
    );
  }
}
export default App;

const AppDiv = styled.div`
  border: 2px solid black;
  display: flex;
  padding: 10px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
