const Sequelize = require("sequelize");

const db = new Sequelize("postgres://localhost/dealer_choice_db");

let breeds = [
  { name: "Nabi", breed: "American short Hair" },

  { name: "Gami", breed: "Maine Coon" },

  { name: "Dani", breed: "Persian" },

  { name: "Lucky", breed: "Orange Tabby" },

  { name: "MoMo", breed: "Bengal" },

  { name: "Mittens", breed: "British Shorthair" },

  { name: "Kevin", breed: "Scottish Fold" },
];

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

const Breed = db.define("breed", {
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

const Cat = db.define("cat", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
});
Cat.belongsTo(Breed);
Cat.belongsTo(Owner);

const syncAndSeed = async () => {
  await db.sync({ force: true });
  const [priscilla, lucy, moe] = await Promise.all(
    ["priscilla", "lucy", "moe"].map((name) => Owner.create({ name }))
  );
  await Promise.all(breeds.map((breed) => Breed.create(breed)));
  const [Nabi, Gami, Dani, MoMo, Lucky, Mittens, Kevin] = await Promise.all(
    ["Nabi", "Gami", "Dani", "MoMo", "Lucky", "Mittens", "Kevin"].map((name) =>
      Breed.create({ name })
    )
  );

  // breeds = breeds.reduce((acc, breed) => {
  //   acc[breed.name] = breed;
  //   return acc;
  // }, {});
  // console.log(breeds);

  const cats = await Promise.all([
    Cat.create({ ownerId: priscilla.id, breedId: Nabi.id }),
    Cat.create({ ownerId: moe.id, breedId: Gami.id }),
    Cat.create({ ownerId: lucy.id, breedId: MoMo.id }),
    Cat.create({ ownerId: moe.id, breedId: Lucky.id }),
    Cat.create({ ownerId: priscilla.id, breedId: Dani.id }),
  ]);
};

// let breeds = [
//   { name: "Nabi", breed: "American short Hair" },

//   { name: "Gami", breed: "Maine Coon" },

//   { name: "Dani", breed: "Persian" },

//   { name: "Lucky", breed: "Orange Tabby" },

//   { name: "MoMo", breed: "Bengal" },

//   { name: "Mister Mittens", breed: "British Shorthair" },

//   { name: "Kevin", breed: "Scottish Fold" },
// ];

// const Cat = db.define("cat", {});

// const Owner = db.define("owner", {
//   name: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
// });

// const catBreed = db.define("catBreed", {
//   id: {
//     type: Sequelize.UUID,
//     defaultValue: Sequelize.UUIDV4,
//     primaryKey: true,
//   },
//   name: {
//     type: Sequelize.STRING,
//   },
//   breed: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
// });

// // Cat.belongsTo(Owner);
// // Owner.hasOne(Cat);

// Cat.belongsTo(Owner);
// Cat.belongsTo(catBreed);

// const syncAndSeed = async () => {
//   await db.sync({ force: true });

//   await Promise.all(breeds.map((breed) => catBreed.create(breed)));

//   ``;
//   const [priscilla, lucy, moe] = await Promise.all(
//     ["priscilla", "lucy", "moe"].map((name) => Owner.create({ name }))
//   );

//   // await Cat.update({ ownerId: priscilla.id }, { where: { name: "Nabi" } }),
//   //   await Cat.update({ ownerId: lucy.id }, { where: { name: "Gami" } }),
//   //   await Cat.update({ ownerId: moe.id }, { where: { name: "Dani" } });
//   // const cats = await Promise.all([
//   const cats = await Promise.all([
//     Cat.create({
//       ownerId: priscilla.id,
//     }),
//     Cat.create({ ownerId: lucy.id }),
//     Cat.create({ ownerId: moe.id }),
//   ]);
// };
// console.log("----------------", catBreed.breeds);

module.exports = {
  db,
  syncAndSeed,
  models: {
    Cat,
    Owner,
    Breed,
  },
};
