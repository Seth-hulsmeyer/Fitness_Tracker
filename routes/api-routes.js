const router = require("express").Router();
const { Workout } = require("../models");

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

router.get("/api/workouts/range", (req, res) => {
  Workout.find({})
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

router.put("/api/workouts/:id", (req, res) => {
  Workout.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, data) => {
      //bad request error
      if (err) return res.status(500).send(err);
      return res.send(data);
    }
  );
});

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
