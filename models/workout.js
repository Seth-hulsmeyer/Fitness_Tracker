const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const virtual = { toJSON: { virtuals: true } };

//Collection Schema for workouts
const sessionSchema = new Schema(
  {
    day: {
      type: Date,
      default: Date.now,
    },
    exercises: [
      {
        type: {
          type: String,
          required: "You must enter the type of the workout",
        },
        name: {
          type: String,
          required: "You must enter in the name of the workout",
        },
        duration: {
          type: Number,
          required: "Your workout must have a duration",
        },
        weight: Number,
        reps: Number,
        sets: Number,
        distance: Number,
      },
    ],
  },
  virtual
);

//virtual to add the exercise duration to the total duration
sessionSchema.virtual("totalDuration").get(function () {
  return this.exercises.reduce((total, exercise) => {
    return total + exercise.duration;
  }, 0);
});

const Workout = mongoose.model("Workout", sessionSchema);

module.exports = Workout;
