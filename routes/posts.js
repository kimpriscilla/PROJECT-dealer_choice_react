const {
  syncAndSeed,
  models: { Cat, Owner },
} = require("../db");

const axios = require("axios");

const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const [cats] = await Promise.all([Cat.findAll()]);
    res.send(
      `
  <html>
  <head>
    <title>Cat Breeds</title>
     <link rel='stylesheet' href='/public/styles.css'/>
  </head>
  <body>
    <div class="cat-list">
      <header>BREED OF CATS</header>
      <div>
      ${cats
        .map(
          (cat) => `
        <div class='cat-item'>
          <p>
          <a href='/cats/${cat.id}'><span class="cat-id">${cat.id}. </span>${cat.breed}
          </p>
        </div>`
        )
        .join("")}
    </div>
  </body>
</html>`
    );
  } catch (error) {
    next(error);
  }
});

router.get("/api/:id", async (req, res) => {
  try {
    res.send(
      await Cat.findAll({
        where: { id: req.params.id },
        include: [Owner],
      })
    );
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const cat = (
      await axios.get(`http://localhost:1337/cats/api/${req.params.id}`)
    ).data[0];

    //console.log("this is our cat!!!!", cat[0].owner.name);
    //console.log("this is the owner!!!!", cat[0].dataValues.owner);
    res.send(`
    <html>
    <head>
    <link rel='stylesheet' href='/public/styles.css'/>

    </head>
    <body>
      <div class="cat-list">
       <header><a href = '/cats'>HOME</a></header>
       <div>Cat Mom:
       ${cat.owner.name}</div>
          <div class='cat-item'>
            <p>
             <span id"cat-breed"><div>Breed:</div>${cat.breed} </span>

            </p>
            <p id = 'cat-fact'><div>Fact:</div>${cat.fact}</p>

          </div>
      </div>
    </body>
    </html>`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
