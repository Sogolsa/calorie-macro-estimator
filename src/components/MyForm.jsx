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
  Grid,
} from "@mui/material";
import { calculateCalorieRange } from "../helpers/calculateCalorieRange";
import "./MyForm.css";

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
    <Container maxWidth="lg">
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h4"
              sx={{
                color: "white",
                textAlign: "center",
                justifyContent: "center",
                mt: 3,
              }}
            >
              Daily Calorie Estimator
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                padding: 2,
                mt: 5,
                boxShadow: "0 2px 10px rgba(0.5, 0, 0, 0)",
                backgroundColor: "#000",
                borderRadius: 2,
              }}
            >
              <FormControl
                fullWidth
                variant="outlined"
                margin="none"
                className="custom-field"
              >
                <InputLabel id="activity-level-label">
                  Activity Level
                </InputLabel>
                <Select
                  labelId="activity-level-label"
                  id="activityLevel"
                  name="activityLevel"
                  value={formData.activityLevel}
                  onChange={handleChange}
                >
                  <MenuItem value="lightly-active">
                    <ListItemText
                      primary="Lightly Active"
                      secondary="< 3 hrs/wk"
                    />
                  </MenuItem>
                  <MenuItem value="moderately-active">
                    <ListItemText
                      primary="Moderately Active"
                      secondary="3-7 hrs/wk"
                    />
                  </MenuItem>
                  <MenuItem value="highly-active">
                    <ListItemText
                      primary="Highly Active"
                      secondary="> 7 hrs/wk"
                    />
                  </MenuItem>
                </Select>
              </FormControl>
              <FormControl
                fullWidth
                variant="filled"
                margin="dense"
                className="custom-field"
              >
                <InputLabel id="goal-label">Goal</InputLabel>
                <Select
                  labelId="goal-label"
                  id="goal"
                  name="goal"
                  value={formData.goal}
                  onChange={handleChange}
                >
                  <MenuItem value="fat-loss">
                    Fat Loss/ Body Recomposition
                  </MenuItem>
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
              <FormControl
                fullWidth
                variant="filled"
                margin="dense"
                className="custom-field"
              >
                <InputLabel id="activity-type-label">Activity Type</InputLabel>
                <Select
                  labelId="activity-type-label"
                  id="activityType"
                  name="activityType"
                  value={formData.activityType}
                  onChange={handleChange}
                >
                  <MenuItem value="endurance">
                    <ListItemText
                      primary="Endurance"
                      secondary="High-volume exercise (e.g., long-distance cycling or
              running)"
                    />
                  </MenuItem>
                  <MenuItem value="strength">
                    <ListItemText
                      primary="Strength"
                      secondary="Bodybuilding, explosive power, and conditioning"
                    />
                  </MenuItem>
                  <MenuItem value="absolute-strength">
                    <ListItemText
                      primary="Absolute Strength"
                      secondary="e.g., Powerlifting"
                    />
                  </MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Current Weight (lb)"
                value={formData.currentWeight}
                name="currentWeight"
                type="number"
                variant="filled"
                fullWidth
                margin="dense"
                onChange={handleChange}
                className="custom-field"
              />
              <FormControl
                variant="filled"
                fullWidth
                margin="dense"
                className="custom-field"
              >
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
                onClick={handleCalculate}
                sx={{ mt: 1, backgroundColor: "#fa4454" }}
              >
                Calculate
              </Button>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {calorieRange && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  mt: 2,
                  p: 2,
                  border: "1px solid #ccc",
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ color: "#fa4454", textAlign: "center" }}
                >
                  Estimated Calories:
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "white", textAlign: "center" }}
                >
                  {calorieRange.lower} - {calorieRange.upper}
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default MyForm;
