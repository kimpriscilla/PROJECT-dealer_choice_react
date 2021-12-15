const {
  models: { Cat, Owner },
} = require("../db");

const express = require("express");
const router = express.Router();

router.get("/cats", async (req, res, next) => {
  try {
    const cats = await Cat.findAll({
      attributes: ["id", "name", "breed"],
      include: [Owner],
    });
    res.json(cats);
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

router.get("/cats/:id", async (req, res, next) => {
  try {
    res.send(
      await Cat.findAll({
        attributes: ["id", "name", "fact", "breed"],
        where: {
          id: req.params.id,
        },
        include: [Owner],
      })
    );
  } catch (error) {
    next(error);
  }
});

router.put("/cats/:id", async (req, res, next) => {
  try {
    const contact = await Cat.findByPk(req.params.id);
    await contact.update(req.body);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
