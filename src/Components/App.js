import React, { Component } from 'react';
import './App.css';
// import axios from "axios";
// import Qs from 'qs';
import Form from './Form';

class App extends Component {

  // take in the users postal code and find the closest store to them
  // take the users drink choice and budget 
  // search in that store and suggest them 3 drinks that 

  constructor() {
    super();
    this.state = {
      userStore: '',
      userBudget: ''
    }
  }

  closeStore = (store) => {
    // console.log(store);
    this.setState({
      userStore: store,
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Wine and Beer</h1>
        </header>
        <Form 
          closeStore={this.closeStore}
        />
        
      </div>
    );
  }
}

export default App;
