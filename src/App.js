import React, { Component } from 'react';
import './styles/App.css';
import TopBar from './components/TopBar';
import List from './components/List';

class App extends Component {
  render() {

    return (
      <div style={styles}>
        <TopBar />
        <List />
      </div >
    );
  }
}

const styles = {
  fontSize: 16
}

export default App;
