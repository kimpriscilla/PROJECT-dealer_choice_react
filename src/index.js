//all of client files are in here, by default where webpack looks here for client side files

import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import SingleCat from "./SingleCat";
import AllCats from "./AllCats";

const app = document.querySelector("#app");

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cats: [],
      selectedCat: {},
    };
    this.selectCat = this.selectCat.bind(this);
    //this.addCat = this.addCat.bind(this);
  }
  async componentDidMount() {
    const cats = (await axios.get("/api/cats")).data;
    console.log("APP Cats-->", cats);
    this.setState({ cats });
  }
  async selectCat(id) {
    const selectedCat = (await axios.get(`/api/cats/${id}`)).data[0];

    this.setState({ selectedCat });
  }

  // addCat = async () => {
  //   // const { data } = await axios.post("/add");
  //   this.setState({
  //     cats: [...this.state.cats, Math.random()],
  //   });
  // };

  render() {
    const { cats, selectedCat } = this.state;
    const { selectCat, addCat } = this;

    return (
      <div>
        <div>
          <h1>
            {" "}
            <a href="/"> LOST PLEASE HELP!</a>
          </h1>
          {/* <button onClick={addCat}>ADD CAT</button> */}
        </div>
        <div id="container">
          {selectedCat.id ? (
            <SingleCat selectedCat={selectedCat} />
          ) : (
            <AllCats selectCat={selectCat} cats={cats} />
          )}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, app);
