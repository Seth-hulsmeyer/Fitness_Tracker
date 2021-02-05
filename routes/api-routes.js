const router = require("express").Router();
const { workout } = require("../models");

//gets all workout data from the db
router.get("/api/workouts", (req, res) => {
  workout
    .find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      //internal server error
      res.status(500).json(err);
    });
});

//organizes data in
router.get("/api/workouts/range", (req, res) => {
  workout
    .find({})
    .sort({ day: -1 })
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => {
      //bad request
      res.status(400).json(err);
    });
});

//puts an updated workout object from front-end to db
router.put("/api/workouts/:id", (req, res) => {
  workout
    .findByIdAndUpdate(
      req.params.id,
      {
        $push: { exercises: req.body },
      },
      { new: true }
    )
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

//posts new workout object to db
router.post("/api/workouts", (req, res) => {
  const { body } = req;
  workout
    .create(body)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
