const {
  db,
  syncAndSeed,
  models: { Cat, Owner },
} = require("./db");

const faker = require("faker");

const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

app.use("/dist", express.static(path.join(__dirname, "dist")));

app.use("/public", express.static(path.join(__dirname, "public")));

app.use("/api", require("./api"));

app.get("/", (req, res, next) =>
  res.sendFile(path.join(__dirname, "index.html"))
);

//created post routes for my add function
app.post("/add", async (req, res, next) => {
  try {
    await Cat.create({
      name: faker.animal.cat(),
      breed: faker.company.companyName(),
      fact: faker.commerce.productDescription(),
      ownerId: 1,
    });
    const allCats = await Cat.findAll({
      include: [Owner],
    });
    res.send(allCats);
  } catch (err) {
    console.log(err);
  }
});

app.delete("/delete/:id", async (req, res, next) => {
  const catsToDelete = await Cat.findByPk(req.params.id);
  catsToDelete.destroy();
  res.sendStatus(204);
});

const start = async () => {
  try {
    await db.authenticate();
    await syncAndSeed();
    const PORT = 1337;
    app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
