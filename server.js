const {
  db,
  syncAndSeed,
  models: { Cat, Owner, Breed },
} = require("./db");

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

//const routes = require("./routes/posts");
//const homePage = require("./views/homePage");
//const detailsPage = require("./views/detailsPage");

//app.use("/cats", routes);

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
