import React, { useState } from "react";
import {
  TextField,
  Box,
  Container,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Tooltip,
  ListItemText,
  Button,
  Typography,
} from "@mui/material";
import { calculateCalorieRange } from "../helpers/calculateCalorieRange";

const MyForm = () => {
  const [formData, setFormData] = useState({
    activityLevel: "",
    activityType: "",
    goal: "",
    currentWeight: "",
    sex: "",
  });

  const [calorieRange, setCalorieRange] = useState(null);

  const handleCalculate = () => {
    try {
      console.log("Activity Level:", formData.activityLevel);
      console.log("Goal:", formData.goal);
      console.log("Current Weight:", formData.currentWeight);

      const result = calculateCalorieRange({
        activityLevel: formData.activityLevel,
        goal: formData.goal,
        currentWeight: parseFloat(formData.currentWeight),
      });
      setCalorieRange(result);
    } catch (err) {
      console.error(err.message);
      alert(err.message);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value }); //rest of data remains unchanged while only updating name
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Container maxWidth="sm">
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <FormControl fullWidth variant="filled" margin="normal">
            <InputLabel id="activity-level-label">Activity Level</InputLabel>
            <Select
              labelId="activity-level-label"
              id="activityLevel"
              name="activityLevel"
              value={formData.activityLevel}
              onChange={handleChange}
            >
              <MenuItem value="lightly-active">
                <ListItemText primary="Lightly Active" secondary="< 3 hrs/wk" />
              </MenuItem>
              <MenuItem value="moderately-active">
                <ListItemText
                  primary="Moderately Active"
                  secondary="3-7 hrs/wk"
                />
              </MenuItem>
              <MenuItem value="highly-active">
                <ListItemText primary="Highly Active" secondary="> 7 hrs/wk" />
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth variant="filled" margin="normal">
            <InputLabel id="goal-label">Goal</InputLabel>
            <Select
              labelId="goal-label"
              id="goal"
              name="goal"
              value={formData.goal}
              onChange={handleChange}
            >
              <MenuItem value="fat-loss">Fat Loss/ Body Recomposition</MenuItem>
              <MenuItem value="maintain-weight">
                Maintenance / Improve Health
              </MenuItem>
              <Tooltip title="Gain Weight">
                <MenuItem value="gain-weight">
                  Muscle Gain / Support Athletic Performance
                </MenuItem>
              </Tooltip>
            </Select>
          </FormControl>
          <FormControl fullWidth variant="filled" margin="normal">
            <InputLabel id="activity-type-label">Activity Type</InputLabel>
            <Select
              labelId="activity-type-label"
              id="activityType"
              name="activityType"
              value={formData.activityType}
              onChange={handleChange}
            >
              <Tooltip
                value="endurance"
                title="high-volume exercise (e.g., long distance cycling or running)"
              >
                <MenuItem>Endurance</MenuItem>
              </Tooltip>
              <Tooltip
                value="strength"
                title="Bodybuilding, explosive power, conditioning and relative strength exercise"
              >
                <MenuItem>Strength</MenuItem>
              </Tooltip>
              <Tooltip value="absolute-strength" title="e.g, Power lifting">
                <MenuItem>Absolute Strength</MenuItem>
              </Tooltip>
            </Select>
          </FormControl>

          <TextField
            label="Current Weight (lb)"
            value={formData.currentWeight}
            name="currentWeight"
            type="number"
            variant="filled"
            fullWidth
            margin="normal"
            onChange={handleChange}
          />
          <FormControl variant="filled" fullWidth margin="normal">
            <InputLabel id="sex-label">Sex</InputLabel>
            <Select
              labelId="sex-label"
              id="sex"
              name="sex"
              value={formData.sex}
              onChange={handleChange}
            >
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="male">Male</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCalculate}
            sx={{ mt: 2 }}
          >
            Calculate
          </Button>

          {calorieRange && (
            <Box
              sx={{ mt: 2, p: 2, border: "1px solid #ccc", borderRadius: 2 }}
            >
              <Typography variant="h6" color="primary">
                Estimated Calories:
              </Typography>
              <Typography variant="body1">
                {calorieRange.lower} - {calorieRange.upper}
              </Typography>
            </Box>
          )}
        </Box>
      </Container>
    </form>
  );
};

export default MyForm;
