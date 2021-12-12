const Sequelize = require("sequelize");

const db = new Sequelize("postgres://localhost/dealer_choice_react");

let ownerData = [
  {
    name: "Priscilla",
    phone: "777-777-7777",
  },
  { name: "Lucy", phone: "800-789-6987" },
  {
    name: "Moe",
    phone: "001-205-2021",
  },
];

//!how to make associations without hard coding it?

const Owner = db.define("owner", {
  name: {
    type: Sequelize.STRING,
  },
  phone: {
    type: Sequelize.STRING,
  },
});

let catData = [
  {
    name: "Nabi",
    breed: "American Tabby",
    fact: "Nabi is a Tabby cat, has multiple colors (gray, brown, white & black). Has the cutest eyes, on the bigger side, very fluffy, chubby and cute but has very bad temper and can become very violet. PLEASE BE AWARE. Senior cat, response to Nabi ",
  },
  {
    name: "Gami",
    breed: "Black American Shorthair",
    fact: "All black cat, responds to Gami. Very sweet & cuddly, not aggressive at all. Has blue/greenish eyes, paws are also black",
  },
  {
    name: "Dani",
    breed: "Ginger",
    fact: "Ginger cat! Very shy, will not approach and will not let you hold him. Relatively on the smaller side. Meows often. Fluffy ",
  },
];

const Cat = db.define("cat", {
  name: {
    type: Sequelize.STRING,
  },
  breed: {
    type: Sequelize.STRING,
  },
  fact: {
    type: Sequelize.STRING,
  },
});

Cat.belongsTo(Owner);

const syncAndSeed = async () => {
  await db.sync({ force: true });
  const [Priscilla, Lucy, Moe] = await Promise.all(
    ownerData.map((el) =>
      Owner.create({
        name: el.name,
        phone: el.phone,
      })
    )
  );
  const [Nabi, Gami, Dani] = await Promise.all(
    catData.map((el) =>
      Cat.create({
        name: el.name,
        breed: el.breed,
        fact: el.fact,
      })
    )
  );
  Nabi.ownerId = Priscilla.id;
  Gami.ownerId = Lucy.id;
  Dani.ownerId = Moe.id;
  Nabi.save();
  Gami.save();
  Dani.save();
};

module.exports = {
  db,
  syncAndSeed,
  models: {
    Cat,
    Owner,
  },
};
