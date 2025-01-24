export const calculateCalorieRange = ({
  activityLevel,
  goal,
  currentWeight,
}) => {
  const multipliers = {
    "lightly-active": {
      "fat-loss": [10, 12],
      "maintain-weight": [12, 14],
      "gain-weight": [16, 18],
    },
    "moderately-active": {
      "fat-loss": [12, 14],
      "maintain-weight": [14, 16],
      "gain-weight": [18, 20],
    },
    "highly-active": {
      "fat-loss": [14, 16],
      "maintain-weight": [16, 18],
      "gain-weight": [20, 22],
    },
  };

  const range = multipliers[activityLevel.toLowerCase()][goal.toLowerCase()];
  console.log("Range:", range);

  if (!range) {
    throw new Error("Invalid activity level or goal");
  }

  const lowerCalories = currentWeight * range[0];
  const upperCalories = currentWeight * range[1];
  return { lower: lowerCalories, upper: upperCalories };
};
