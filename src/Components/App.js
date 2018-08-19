import React, { Component } from 'react';
import './App.css';
import axios from "axios";
import Qs from 'qs';


// import Form from "./Form";


class App extends Component {

  // take in the users postal code and find the closest store to them
  // take the users drink choice and budget 
  // search in that store and suggest them 3 drinks that 

  constructor() {
    super();
    this.state = {
      displayDrink: '',
      displayStore: '',
      posts: []
    }
  }

  postalRef = React.createRef();

  getUserInfo = (e) => {
    e.preventDefault();
    // get the postal code value
    const userPostal = this.postalRef.current.value;

    const finalPostal = userPostal.split(' ').join('+');
    this.getStore(finalPostal);
    // reset the fields after submit hit
    e.currentTarget.reset();
  }

  getStore = (geo) => {
    console.log(geo);

    axios({
      method: "GET",
      url: "http://proxy.hackeryou.com",
      dataResponse: "json",
      paramsSerializer: function (params) {
        return Qs.stringify(params, { arrayFormat: "brackets" });
      },
      params: {
        reqUrl: `http://lcboapi.com/stores?geo=${geo}`,
        params: {
          Authorization:
            "MDo0NzhjODRiZS1hM2UyLTExZTgtODY5Yi1mMzUwY2I4MDMzZDY6VHhFYWFNS1Z0TEtYMEFxT1hCTWpsN2hnWHVHc2xDQ1lrYVBX"
        },
        proxyHeaders: {
          header_params: "value"
        },
        xmlToJSON: false
      }
    }).then(res => {
      console.log(res.data.result[0]);
    });

  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Wine and Beer</h1>
        </header>
        {/* <Form /> */}
        <form onSubmit={this.getUserInfo}>
          <label htmlFor="postal">Postal Code</label>
          <input id='postal' type='text' pattern='[L-Pl-p][0-9][A-Za-z] [0-9][A-Za-z][0-9]' placeholder='M5A 3W7' ref={this.postalRef} />

          <button type="submit" >Find Me A Drink!</button>
        </form>
      </div>
    );
  }
}

export default App;
