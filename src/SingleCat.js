import React from "react";

const SingleCat = (props) => {
  const { selectedCat } = props;
  const { name, breed, fact, owner } = selectedCat;
  return (
    <div id="single-cat">
      {/* <img src={imageUrl} /> */}
      <table id="cat-info">
        <tbody>
          <tr>
            <th>Name: </th>
            <th>breed: </th>
            <th>Fact: </th>
          </tr>
          <tr>
            <td>{name}</td>
            <td>{breed}</td>
            <td>{fact}</td>
          </tr>
        </tbody>
      </table>
      <h2>PLEASE CONTACT:</h2>
      <p>Owner: {owner.name}</p>
      <p>Phone: {owner.phone}</p>
    </div>
  );
};

export default SingleCat;
