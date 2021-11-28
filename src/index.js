//all of client files are in here, by default where webpack looks here for client side files
const catsList = document.querySelector("#cats-list");
const ownersList = document.querySelector("#owners-list");
const breedsList = document.querySelector("#breeds-list");

let users, owners, breeds;

// const renderCats =()=>{
//   const catsId = window.HashChangeEvent.slice(1)
//   const html = cats.map((cat)=>{
//     return `
//     <li class = '${cat.id}'
//     `
//   })
// }
