//all of client files are in here, by default where webpack looks here for client side files
import axios from "axios";
const catsList = document.querySelector("#cats-list");
const ownersList = document.querySelector("#owners-list");
const relationshipsList = document.querySelector("#relationships-list");

let cats, owners, relationships;

const renderOwners = (owners) => {
  // const ownerId = window.HashChangeEvent.slice(1);
  const html = owners
    .map(
      (owner) =>
        `
    <li>
    <a href="#${owner.id}">
    ${owner.name}
    </a>
    </li>
    `
    )
    .join("");
  ownersList.innerHTML = html;
};

const renderCats = (cats) => {
  // const ownerId = window.HashChangeEvent.slice(1);
  const html = cats
    .map(
      (cat) =>
        `
    <li>
    ${cat.name}
    </li>
    `
    )
    .join("");
  catsList.innerHTML = html;
};

const renderRelationships = (relationships) => {
  // const ownerId = window.HashChangeEvent.slice(1);
  const html = relationships
    .map(
      (relationship) =>
        `
    <li>
    ${relationship.cat.name}

    </li>
    `
    )
    .join("");
  relationshipsList.innerHTML = html;
};

const start = async () => {
  try {
    owners = (await axios.get("/api/owners")).data;
    cats = (await axios.get("/api/cats")).data;
    //console.log(owners, cats);
    renderOwners(owners);
    renderCats(cats);
  } catch (error) {
    console.log(error);
  }
};

window.addEventListener("hashchange", async () => {
  const ownerId = window.location.hash.slice(1);
  const url = `/api/owners/${ownerId}/cats`;
  const relationships = (await axios(url)).data;
  renderRelationships(relationships);
});

start();
