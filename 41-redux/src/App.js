import React from "react";
import "./App.css";
import { connect } from "react-redux"
import beyArray from './api'
import BeyContainer from './containers/BeyContainer'
import Favorites from './containers/Favorites'
import CreateForm from "./components/CreateForm";
import Search from "./components/Search";
import { getBeys } from "./redux/action";

class App extends React.Component {

  state = {
    searchValue: ""
  }

  componentDidMount() {
    this.props.get_beys()
  }

  changeHandler = (e) => {
    console.log("changing")
    this.setState({ searchValue: e.target.value })
  }

  clickHandler = (id) => {
    let newArray = [...this.state.beyArray]
    let foundObj = newArray.find(beyObj => beyObj.id === id)
    foundObj.favorite = !foundObj.favorite
    this.setState({ beyArray: newArray })
  }
  // favoriteClickHandler = (id) => {
  //   let newArray = [...this.state.beyArray]
  //   let foundObj = newArray.find(beyObj => beyObj.id === id)
  //   foundObj.favorite = !foundObj.favorite
  //   this.setState({ beyArray: newArray })
  //   window.alert("I got a hot sauce in my bag, swag")
  // }

  filteredFavoriteBeys = () => {
    return this.state.beyArray.filter(beyObj => beyObj.favorite).filter(bey => bey.name.toLowerCase().includes(this.state.searchValue.toLowerCase()))
  }

  filteredContainerBeys = () => {
    return this.state.beyArray.filter(bey => bey.name.toLowerCase().includes(this.state.searchValue.toLowerCase()))
  }

  submitHandler = (obj) => {
    this.setState({ beyArray: [obj, ...this.state.beyArray] })

  }

  render() {
    console.log("App Props: ", this.props)
    return (
      <div className="container">
        <CreateForm submitHandler={this.submitHandler} />
        <br />
        <Search searchValue={this.state.searchValue} changeHandler={this.changeHandler} />
        <BeyContainer clickHandler={this.clickHandler} />
        {/* <Favorites beys={this.filteredFavoriteBeys()} clickHandler={this.favoriteClickHandler} /> */}
      </div>
    );
  }
};

function mdp(dispatch) {
  return { get_beys: () => dispatch(getBeys()) }
}

export default connect(null, mdp)(App);
// x = mapState function
// y = mapDispatch function 