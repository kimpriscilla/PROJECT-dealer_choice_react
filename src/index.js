//all of client files are in here, by default where webpack looks here for client side files

import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

const app = document.querySelector("#app");

const SingleCat = (props) => {
  const { selectedCat } = props;
  const { name, breed, fact } = selectedCat;
  return (
    <div id="single-cat">
      {/* <img src={imageUrl} /> */}
      <div id="contact-info">
        <p>Name: {name}</p>
        <p>breed: {breed}</p>
        <p>Fact: {fact}</p>
      </div>
    </div>
  );
};

const AllCats = (props) => {
  const { cats, selectCat } = props;
  return (
    <table>
      <tbody>
        <tr>
          <th>Name</th>
          <th>Breed</th>
          <th>Owner</th>
        </tr>
        {cats.map((cat) => (
          <EachCat key={cat.id} cat={cat} />
        ))}
      </tbody>
    </table>
  );
};

const EachCat = (props) => {
  const { cat, selectCat } = props;
  return (
    <tr onClick={() => console.log("what is this", selectCat)}>
      <td>{cat.name}</td>
      <td>{cat.breed}</td>
      <td>{cat.fact}</td>
    </tr>
  );
};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cats: [],
      selectedCat: {},
    };
    this.selectCat = this.selectCat.bind(this);
  }
  async componentDidMount() {
    const cats = (await axios.get("/api/cats")).data;
    console.log(cats);
    this.setState({ cats });
  }
  async selectCat(id) {
    const selectedCat = (await axios.get(`/api/cats/${id}`)).data;
    console.log(selectedCat);
    this.setState({ selectedCat });
  }
  render() {
    const { cats, selectedCat } = this.state;
    const { selectCat } = this;

    return (
      <div>
        <div>
          <h1> LOST PLEASE HELP!</h1>
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
//!------------------------

// import axios from "axios";
// const catsList = document.querySelector("#cats-list");
// const ownersList = document.querySelector("#owners-list");
// const relationshipsList = document.querySelector("#relationships-list");

// let cats, owners, relationships;

// const renderOwners = (owners) => {
//   const html = owners
//     .map(
//       (owner) =>
//         `
//     <li>
//     <a href="#${owner.id}">
//     ${owner.name}
//     </a>
//     </li>
//     `
//     )
//     .join("");
//   ownersList.innerHTML = html;
// };

// const renderCats = (cats) => {
//   const html = cats
//     .map(
//       (cat) =>
//         `
//     <li>
//     ${cat.name}
//     </li>
//     `
//     )
//     .join("");
//   catsList.innerHTML = html;
// };

// const renderRelationships = (relationships) => {
//   const html = relationships
//     .map(
//       (relationship) =>
//         `
//     <li class = 'rela-list'>
//    Pet:${relationship.cat.name} </p>
//     <div></div>
//     Owner:
//       ${relationship.owner.name}
//     </li>
//     `
//     )
//     .join("");
//   relationshipsList.innerHTML = html;
// };

// const start = async () => {
//   try {
//     owners = (await axios.get("/api/owners")).data;
//     cats = (await axios.get("/api/cats")).data;
//     //console.log(owners, cats);
//     renderOwners(owners);
//     renderCats(cats);
//   } catch (error) {
//     console.log(error);
//   }
// };

// window.addEventListener("hashchange", async () => {
//   const ownerId = window.location.hash.slice(1);
//   const url = `/api/owners/${ownerId}/cats`;
//   const relationships = (await axios(url)).data;
//   renderRelationships(relationships);
// });

// start();
