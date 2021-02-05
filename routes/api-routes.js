const router = require("express").Router();
const { Workout } = require("../models");

//gets all workout data from the db
router.get("/api/workouts", (req, res) => {
  Workout.find({})
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
  Workout.find({})
    .sort({ day: -1 })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      //bad request
      res.status(400).json(err);
    });
});

//puts an updated workout object from front-end to db
router.put("/api/workouts/:id", (req, res) => {
  Workout.findByIdAndUpdate(
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
  Workout.create(body)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
