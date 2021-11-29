const Sequelize = require("sequelize");

const db = new Sequelize("postgres://localhost/dealer_choice_db");

// let breeds = [
//   { name: "Nabi", breed: "American short Hair" },

//   { name: "Gami", breed: "Maine Coon" },

//   { name: "Dani", breed: "Persian" },

//   { name: "Lucky", breed: "Orange Tabby" },

//   { name: "MoMo", breed: "Bengal" },

//   { name: "Mittens", breed: "British Shorthair" },

//   { name: "Kevin", breed: "Scottish Fold" },
// ];

const Owner = db.define("owner", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
  },
});

const Cat = db.define("cat", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  // breed: {
  //   type: Sequelize.STRING,
  // },
});

const Relationship = db.define("relationship", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
});

Relationship.belongsTo(Cat);
Relationship.belongsTo(Owner);

const syncAndSeed = async () => {
  await db.sync({ force: true });
  const [Priscilla, Lucy, Moe] = await Promise.all(
    ["Priscilla", "Lucy", "Moe"].map((name) => Owner.create({ name }))
  );
  // await Promise.all(breeds.map((breed) => Breed.create(breed)));
  // breeds = breeds.reduce((acc, breed) => {
  //   acc[breed.name] = breed;
  //   return acc;
  // }, {});
  // console.log(breeds);

  const [Nabi, Gami, Dani, MoMo, Lucky, Mittens, Kevin] = await Promise.all(
    ["Nabi", "Gami", "Dani", "MoMo", "Lucky", "Mittens", "Kevin"].map((name) =>
      Cat.create({ name })
    )
  );

  const relationships = await Promise.all([
    Relationship.create({ ownerId: Priscilla.id, catId: Nabi.id }),
    Relationship.create({ ownerId: Moe.id, catId: Gami.id }),
    Relationship.create({ ownerId: Lucy.id, catId: MoMo.id }),
    Relationship.create({ ownerId: Moe.id, catId: Lucky.id }),
    Relationship.create({ ownerId: Priscilla.id, catId: Dani.id }),
  ]);
};

module.exports = {
  db,
  syncAndSeed,
  models: {
    Cat,
    Owner,
    Relationship,
  },
};
