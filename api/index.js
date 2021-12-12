const {
  models: { Cat, Owner, Relationship },
} = require("../db");

const axios = require("axios");

const express = require("express");
const router = express.Router();

router.get("/cats", async (req, res, next) => {
  try {
    res.send(await Cat.findAll());
  } catch (error) {
    next(error);
  }
});

router.get("/owners", async (req, res, next) => {
  try {
    res.send(await Owner.findAll());
  } catch (error) {
    next(error);
  }
});

// router.get("/relationships", async (req, res, next) => {
//   try {
//     res.send(await Relationship.findAll());
//   } catch (error) {
//     next(error);
//   }
// });

router.get("/cats/:id/owners", async (req, res, next) => {
  try {
    res.send(
      await Cat.findAll({
        where: {
          ownerId: req.params.id,
        },
        include: [Owner],
      })
    );
  } catch (error) {
    next(error);
  }
});

module.exports = router;
