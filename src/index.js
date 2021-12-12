//all of client files are in here, by default where webpack looks here for client side files

import React from "react";
import ReactDOM from "react-dom";

const app = document.querySelector("#app");

class App extends React.Component {
  render() {
    return (
      <div>
        <h1> HELLO WORLD</h1>
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
