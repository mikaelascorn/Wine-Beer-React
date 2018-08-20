import React, { Component } from 'react';
import axios from "axios";
import Qs from "qs";

class Form extends Component {

  postalRef = React.createRef();
  budgetRef = React.createRef();

  getUserInfo = e => {
    e.preventDefault();
    // get the users value
    const userPostal = this.postalRef.current.value;
    // const userBudget = this.budgetRef;
    console.log(this.budgetRef);   
    console.log(e.target);
    
    const finalPostal = userPostal.split(' ').join('+');
    this.getStore(finalPostal);

    // this.getBudget(userBudget);
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
      const store = {
        location: res.data.result[0].address_line_1,
        city: res.data.result[0].city,
      }

      // const storeId = res.data.result[0].id;
      // pass store ID to the search store 

      // pass the store object to the main app, hold in state to render to page
      this.props.closeStore(store);
    });
  }

  getBudget = (budget) => {
    console.log(budget);
    
  }

  render() {
    return <form onSubmit={this.getUserInfo}>
        <h2>Where are you?</h2>
        <label htmlFor="postal">Enter your postal code</label>
        <input id="postal" type="text" pattern="[L-Pl-p][0-9][A-Za-z] [0-9][A-Za-z][0-9]" placeholder="M5A 3W7" ref={this.postalRef} />

        <div>
          <h2>Budget!</h2>
          <input 
            type="radio" 
            name="price" 
            id="budget" 
            value="budget" 
            ref={this.budgetRef}
          />
          <label htmlFor="budget">$</label>

          <input 
            type="radio" 
            name="price" 
            id="cheap" 
            value="cheap" 
            ref={this.budgetRef}
          />
          <label htmlFor="cheap">$$</label>

          <input 
            type="radio" 
            name="price" 
            id="pricy" 
            value="pricy" 
            ref={this.budgetRef}
          />
          <label htmlFor="pricy">$$$</label>

          <input 
            type="radio" 
            name="price" 
            id="expensive" 
            value="expensive" 
            ref={this.budgetRef}
          />
          <label htmlFor="expensive">$$$$</label>
        </div>

        <button type="submit">Find Me A Drink!</button>
      </form>;
  }
}

export default Form;