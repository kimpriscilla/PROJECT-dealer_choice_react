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
      //view: "",
    };
    this.selectCat = this.selectCat.bind(this);
    this.addCat = this.addCat.bind(this);
    this.deleteCat = this.deleteCat.bind(this);
  }
  async componentDidMount() {
    // window.addEventListener("hashchange", () => {
    //   this.setState({ view: window.location.hash.slice(1) });
    // });
    // this.setState({ view: window.location.hash.slice(1) });
    const cats = (await axios.get("/api/cats")).data;
    this.setState({ cats });
  }
  async selectCat(id) {
    const selectedCat = (await axios.get(`/api/cats/${id}`)).data[0];
    this.setState({ selectedCat });
  }
  addCat = async () => {
    const { data } = await axios.post("/add");
    console.log("new cat-->", data);
    this.setState({
      cats: data,
    });
  };
  deleteCat = async (id) => {
    await axios.delete(`/delete/${id}`);
    this.setState({
      cats: this.state.cats.filter((cat) => {
        return cat.id !== id;
      }),
    });
  };

  render() {
    const { cats, selectedCat } = this.state;
    const { selectCat, addCat, deleteCat } = this;

    return (
      <div>
        <div>
          <h1>
            {" "}
            <a href="/"> LOST PLEASE HELP!</a>
          </h1>
          <button onClick={addCat}>ADD CAT</button>
        </div>
        <div id="container">
          {selectedCat.id ? (
            <SingleCat selectedCat={selectedCat} />
          ) : (
            <AllCats
              selectCat={selectCat}
              cats={cats}
              key={cats.id}
              deleteCat={deleteCat}
            />
          )}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, app);
