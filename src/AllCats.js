import React from "react";
import EachCat from "./EachCat";

const AllCats = (props) => {
  const { cats, selectCat, deleteCat } = props;
  return (
    <table>
      <tbody>
        <tr>
          <th>Name</th>
          <th>Breed</th>
          <th>Owner</th>
        </tr>

        {cats.map((cat) => {
          return (
            <EachCat
              selectCat={selectCat}
              key={cat.id}
              cat={cat}
              deleteCat={deleteCat}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default AllCats;
