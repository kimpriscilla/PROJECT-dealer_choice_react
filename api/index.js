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

router.get("/relationships", async (req, res, next) => {
  try {
    res.send(await Relationship.findAll());
  } catch (error) {
    next(error);
  }
});

router.get("/owners/:id/cats", async (req, res, next) => {
  try {
    res.send(
      await Relationship.findAll({
        where: {
          ownerId: req.params.id,
        },
        include: [Cat, Owner],
      })
    );
  } catch (error) {
    next(error);
  }
});

module.exports = router;
