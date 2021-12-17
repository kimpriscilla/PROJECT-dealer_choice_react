import React from "react";
import EachCat from "./EachCat";

const AllCats = (props) => {
  const { cats, selectCat } = props;
  console.log("ALL CATS->>", cats);
  return (
    <table>
      <tbody>
        <tr>
          <th>Name</th>
          <th>Breed</th>
          <th>Owner</th>
        </tr>
        {cats.map((cat) => (
          <EachCat selectCat={selectCat} key={cat.id} cat={cat} />
        ))}
      </tbody>
    </table>
  );
};

export default AllCats;
