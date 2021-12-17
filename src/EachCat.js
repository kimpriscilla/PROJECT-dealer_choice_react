import React from "react";

const EachCat = (props) => {
  const { cat, selectCat, selectedCat } = props;
  console.log("CAT->>", cat);
  return (
    <tr
      onClick={() => {
        selectCat(cat.id);
        //console.log("cat--", selectedCat);
      }}
    >
      <td>{cat.name}</td>
      <td>{cat.breed}</td>
      <td>{cat.owner.name}</td>
    </tr>
  );
};

export default EachCat;
