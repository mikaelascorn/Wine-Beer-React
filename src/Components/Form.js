import React, { Component } from 'react';
import axios from "axios";
import Qs from "qs";

class Form extends Component {
  postalRef = React.createRef();
  budgetRef = React.createRef();
  drinkRef = React.createRef();

  getUserInfo = e => {
    e.preventDefault();
    // get the users choice
    const userPostal = this.postalRef.current.value;
    const userBudget = this.budgetRef.current.value;
    const userDrink = this.drinkRef.current.value;

    const finalPostal = userPostal.split(" ").join("+");
    this.getStore(finalPostal);

    this.getDrinks(userDrink);

    this.filterDrinks(userBudget);

    this.filterDrinks(userDrink);
    // reset the fields after submit hit
    // e.currentTarget.reset();
  };

  getStore = geo => {
    // console.log(geo);
    axios({
      method: "GET",
      url: "http://proxy.hackeryou.com",
      dataResponse: "json",
      paramsSerializer: function(params) {
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
      // console.log(res.data.result[0]);
      const store = {
        location: res.data.result[0].address_line_1,
        city: res.data.result[0].city
      };

      const storeId = res.data.result[0].id;
      // pass store ID to the search store
      this.getDrinks(storeId)
      // pass the store object to the main app, hold in state to render to page
      this.props.closeStore(store);
    });
  };

  getDrinks = (drink, store) => {
    // console.log(drink, store);
    const userDrink = drink;
    const userStore = store;
    axios({
      method: "GET",
      url: "http://proxy.hackeryou.com",
      dataResponse: "json",
      paramsSerializer: function(params) {
        return Qs.stringify(params, { arrayFormat: "brackets" });
      },
      params: {
        reqUrl: `http://lcboapi.com/products?q=${userDrink}&per_page=100&=${userStore}`,
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
      // console.log(res.data.result);
      const data = res.data.result;
      this.filterDrinks(data);
    });
  };

  // filter the drinks by price 
  filterDrinks = (data, budget, drink) => {
    console.log(data, budget, drink);

    // buried if else statements checking wine colour and then budget
    // if (drink === red || white ) {
      // if (budget)
    // }
  }

  render() {
    return (
      <form onSubmit={this.getUserInfo}>
        <h2>Where are you?</h2>
        <label htmlFor="postal">Enter your postal code</label>
        <input
          id="postal"
          type="text"
          pattern="[L-Pl-p][0-9][A-Za-z] [0-9][A-Za-z][0-9]"
          placeholder="M5A 3W7"
          ref={this.postalRef}
        />

        <h2>Budget!</h2>
        <select ref={this.budgetRef}>
          <option value="budget">$</option>
          <option value="cheap">$$</option>
          <option value="pricy">$$$</option>
          <option value="expensive">$$$$</option>
        </select>

        <h2>Poison!</h2>
        <select ref={this.drinkRef}>
          <option value="white">White Wine</option>
          <option value="red">Red Wine</option>
          <option value="beer">Beer</option>
          <option value="cider">Cider</option>
        </select>

        <button type="submit">Find Me A Drink!</button>
      </form>
    );
  }
}

export default Form;


