import React from "react";

const EachCat = (props) => {
  const { cat, selectCat, deleteCat } = props;
  return (
    <tr>
      <td
        onClick={() => {
          selectCat(cat.id);
        }}
      >
        {cat.name}
      </td>
      <td>{cat.breed}</td>
      <td>{cat.owner.name}</td>
      <td
        onClick={() => {
          deleteCat(cat.id);
        }}
      >
        CLICK TO DELETE
      </td>
    </tr>
  );
};

export default EachCat;
